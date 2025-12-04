"use client";

import { useState, useEffect } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

// API Types
type QuestionOption = {
  display: string;
  minimized: string;
};

type Question = {
  question_id: string;
  question_text: string;
  question_type: "single_select" | "multi_select";
  options: QuestionOption[];
  allow_other: boolean;
  other_prompt: string;
  required: boolean;
  position: number;
};

type QuestionsResponse = {
  questions: Question[];
};

type Experience = {
  name: string;
  url: string;
  main_photo_url?: string;
  similarity_score: number;
  similarity_distance: number;
};

type SearchResponse = {
  experiences: Experience[];
  metadata: {
    total_results: number;
    client_summary: string;
  };
};

type Answers = Record<string, string | string[]>;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function WizardFlow() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
  const [experiences, setExperiences] = useState<Experience[]>([]);
  // const [clientSummary, setClientSummary] = useState("");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/experience_searches/questions`);
        const data: QuestionsResponse = await response.json();
        // Sort by position
        const sortedQuestions = data.questions.sort((a, b) => a.position - b.position);
        setQuestions(sortedQuestions);
        console.log("Questions loaded:", data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, []);

  const totalSteps = questions.length + 1; // questions + results step

  const currentQuestion = questions[currentStep - 1];

  const handleSelectOption = (questionId: string, optionDisplay: string, isMultiSelect: boolean) => {
    setAnswers((prev) => {
      if (isMultiSelect) {
        const currentAnswers = (prev[questionId] as string[]) || [];
        if (currentAnswers.includes(optionDisplay)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter((a) => a !== optionDisplay),
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionDisplay],
          };
        }
      } else {
        // Clear custom input when selecting a predefined option
        setCustomInputs((prevCustom) => ({ ...prevCustom, [questionId]: "" }));
        return {
          ...prev,
          [questionId]: optionDisplay,
        };
      }
    });
  };

  const handleCustomInput = (questionId: string, value: string, isMultiSelect: boolean) => {
    setCustomInputs((prev) => ({ ...prev, [questionId]: value }));
    if (value) {
      if (isMultiSelect) {
        // For multi-select, we'll add the custom value on blur or submit
      } else {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
      }
    }
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const answer = answers[currentQuestion.question_id];
    const customInput = customInputs[currentQuestion.question_id];

    if (!currentQuestion.required) return true;

    if (currentQuestion.question_type === "multi_select") {
      const selectedAnswers = (answer as string[]) || [];
      return selectedAnswers.length > 0 || (customInput && customInput.trim() !== "");
    } else {
      return (answer && answer !== "") || (customInput && customInput.trim() !== "");
    }
  };

  const handleNext = async () => {
    if (!canProceed()) return;

    // Add custom input to answers if present for multi-select
    if (currentQuestion && currentQuestion.question_type === "multi_select") {
      const customValue = customInputs[currentQuestion.question_id];
      if (customValue && customValue.trim()) {
        setAnswers((prev) => {
          const currentAnswers = (prev[currentQuestion.question_id] as string[]) || [];
          if (!currentAnswers.includes(customValue.trim())) {
            return {
              ...prev,
              [currentQuestion.question_id]: [...currentAnswers, customValue.trim()],
            };
          }
          return prev;
        });
      }
    }

    if (currentStep < totalSteps) {
      if (currentStep === questions.length) {
        // Last question step - submit answers and fetch results
        await fetchResults();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const fetchResults = async () => {
    setIsLoadingResults(true);
    try {
      // Build final answers object
      const finalAnswers: Answers = { ...answers };

      // Add any remaining custom inputs for multi-select
      questions.forEach((q) => {
        const customValue = customInputs[q.question_id];
        if (q.question_type === "multi_select" && customValue && customValue.trim()) {
          const currentAnswers = (finalAnswers[q.question_id] as string[]) || [];
          if (!currentAnswers.includes(customValue.trim())) {
            finalAnswers[q.question_id] = [...currentAnswers, customValue.trim()];
          }
        } else if (q.question_type === "single_select" && customValue && customValue.trim()) {
          finalAnswers[q.question_id] = customValue.trim();
        }
      });

      console.log("Submitting answers:", finalAnswers);

      const response = await fetch(`${BASE_URL}/api/v1/experience_searches/by_vector`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      const data: SearchResponse = await response.json();
      console.log("Search results:", data);
      setExperiences(data.experiences);
      // setClientSummary(data.metadata.client_summary);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setIsLoadingResults(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setAnswers({});
    setCustomInputs({});
    setExperiences([]);
    // setClientSummary("");
    setError(null);
  };

  const isOptionSelected = (questionId: string, optionDisplay: string, isMultiSelect: boolean) => {
    const answer = answers[questionId];
    if (isMultiSelect) {
      return ((answer as string[]) || []).includes(optionDisplay);
    }
    return answer === optionDisplay;
  };

  const isCustomInputActive = (questionId: string) => {
    const customValue = customInputs[questionId];
    return customValue && customValue.trim() !== "";
  };

  if (isLoadingQuestions) {
    return (
      <SectionContainer background="black" className="py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FIND YOUR EXPERIENCE
          </h2>
          <p className="text-white/60 text-lg">Loading questions...</p>
        </div>
      </SectionContainer>
    );
  }

  if (error && questions.length === 0) {
    return (
      <SectionContainer background="black" className="py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FIND YOUR EXPERIENCE
          </h2>
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide"
          >
            Retry
          </button>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FIND YOUR EXPERIENCE
          </h2>
          <p className="text-white/60 text-lg">
            Answer {questions.length} quick questions to get matched
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  currentStep === step
                    ? "bg-white text-black"
                    : currentStep > step
                    ? "bg-white/30 text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {step}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                    currentStep > step ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] h-min">
          {/* Question Steps */}
          {currentStep <= questions.length && currentQuestion && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                {currentQuestion.question_text.toUpperCase()}
              </h3>
              <p className="text-white/60 text-center mb-8">
                {currentQuestion.question_type === "multi_select"
                  ? "Select all that apply"
                  : "Select one option"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.display}
                    onClick={() =>
                      handleSelectOption(
                        currentQuestion.question_id,
                        option.display,
                        currentQuestion.question_type === "multi_select"
                      )
                    }
                    className={`p-5 rounded-xl border transition-all duration-300 text-left ${
                      isOptionSelected(
                        currentQuestion.question_id,
                        option.display,
                        currentQuestion.question_type === "multi_select"
                      )
                        ? "bg-white text-black border-white"
                        : "bg-primary-charcoal text-white border-white/10 hover:border-white/30"
                    }`}
                    style={{
                      boxShadow: isOptionSelected(
                        currentQuestion.question_id,
                        option.display,
                        currentQuestion.question_type === "multi_select"
                      )
                        ? "0 0 30px rgba(255, 255, 255, 0.2)"
                        : "none",
                    }}
                  >
                    <div className="text-base font-bold">{option.display}</div>
                  </button>
                ))}
              </div>

              {/* Custom input for "Other" option */}
              {currentQuestion.allow_other && (
                <div className="mt-6">
                  <div
                    className={`relative rounded-xl border transition-all duration-300 ${
                      isCustomInputActive(currentQuestion.question_id)
                        ? "border-white"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    style={{
                      boxShadow: isCustomInputActive(currentQuestion.question_id)
                        ? "0 0 30px rgba(255, 255, 255, 0.2)"
                        : "none",
                    }}
                  >
                    <input
                      type="text"
                      placeholder={currentQuestion.other_prompt || "Or describe your own..."}
                      value={customInputs[currentQuestion.question_id] || ""}
                      onChange={(e) =>
                        handleCustomInput(
                          currentQuestion.question_id,
                          e.target.value,
                          currentQuestion.question_type === "multi_select"
                        )
                      }
                      className="w-full bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Step */}
          {currentStep === totalSteps && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                YOUR MATCHED EXPERIENCES
              </h3>
              <p className="text-white/60 text-center mb-8">
                Based on your selections, here are our top recommendations
              </p>

              {isLoadingResults ? (
                <div className="text-center py-12">
                  <p className="text-white/60 text-lg">Finding your perfect experiences...</p>
                </div>
              ) : (
                <>
                  {/* Client Summary
                  {clientSummary && (
                    <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 mb-8">
                      <p className="text-white/80 italic">&quot;{clientSummary}&quot;</p>
                    </div>
                  )} */}

                  {/* Experience Cards */}
                  {experiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {experiences.map((exp, index) => (
                        <a
                          key={exp.url}
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300 block"
                          style={{
                            boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
                          }}
                        >
                          <div className="aspect-video bg-white/5 rounded-lg mb-4 overflow-hidden">
                            {exp.main_photo_url && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={exp.main_photo_url}
                                alt={exp.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/40 text-sm font-bold">#{index + 1} Match</span>
                            <span className="text-white/60 text-sm">
                              {Math.round(exp.similarity_score * 100)}% match
                            </span>
                          </div>
                          <h4 className="text-white font-bold text-lg">
                            {exp.name}
                          </h4>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-white/60">No experiences found matching your criteria.</p>
                    </div>
                  )}

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={resetWizard}
                      className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide"
                    >
                      Start Over
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep < totalSteps && (
          <div className="flex justify-between mt-5">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-full border border-white/30 font-bold uppercase tracking-wide transition-all duration-300 ${
                currentStep === 1
                  ? "text-white/30 cursor-not-allowed"
                  : "text-white hover:bg-white hover:text-black"
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed() || isLoadingResults}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                canProceed() && !isLoadingResults
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/20 text-white/40 cursor-not-allowed"
              }`}
            >
              {isLoadingResults
                ? "Loading..."
                : currentStep === questions.length
                ? "Show Results"
                : "Next"}
            </button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
