"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type Answers = {
  description: string | null;
  energy: string | null;
  location: string | null;
  feeling: string | null;
};

const questions = [
  {
    id: "description",
    question: "How would you describe your event?",
    options: [
      { value: "elegant", label: "Elegant" },
      { value: "wild", label: "Wild" },
      { value: "techy", label: "Techy" },
      { value: "artistic", label: "Artistic" },
      { value: "playful", label: "Playful" },
    ],
  },
  {
    id: "energy",
    question: "What energy level do you want?",
    options: [
      { value: "calm", label: "Calm" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "chaotic", label: "Chaotic-fun" },
    ],
  },
  {
    id: "location",
    question: "Indoor or outdoor?",
    options: [
      { value: "indoor", label: "Indoor" },
      { value: "outdoor", label: "Outdoor" },
      { value: "both", label: "Both" },
      { value: "doesnt-matter", label: "Doesn't matter" },
    ],
  },
  {
    id: "feeling",
    question: "What feeling do you want to create?",
    options: [
      { value: "wow", label: "WOW" },
      { value: "joy", label: "Joy" },
      { value: "curiosity", label: "Curiosity" },
      { value: "participation", label: "Participation" },
    ],
  },
];

const mockResults = [
  {
    id: 1,
    name: "Immersive Light Garden",
    type: "Installation",
    price: "$4,500",
    matchScore: 95,
  },
  {
    id: 2,
    name: "Interactive Sound Sculpture",
    type: "Art Experience",
    price: "$3,800",
    matchScore: 88,
  },
  {
    id: 3,
    name: "Projection Mapping Show",
    type: "Performance",
    price: "$6,200",
    matchScore: 85,
  },
];

export function ExperienceQuiz() {
  const [answers, setAnswers] = useState<Answers>({
    description: null,
    energy: null,
    location: null,
    feeling: null,
  });
  const [customInputs, setCustomInputs] = useState<Answers>({
    description: null,
    energy: null,
    location: null,
    feeling: null,
  });
  const [showResults, setShowResults] = useState(false);
  const [showAllQuestions] = useState(true); // Toggle to show all at once

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Clear custom input when selecting an option
    setCustomInputs((prev) => ({
      ...prev,
      [questionId]: null,
    }));
  };

  const handleCustomInputChange = (questionId: string, value: string) => {
    setCustomInputs((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    // Set the custom value as the answer if not empty
    if (value.trim()) {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value.trim(),
      }));
    } else {
      // Clear answer if input is empty
      setAnswers((prev) => ({
        ...prev,
        [questionId]: null,
      }));
    }
  };

  const allAnswered = Object.values(answers).every((answer) => answer !== null);

  const handleShowResults = () => {
    if (allAnswered) {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({
      description: null,
      energy: null,
      location: null,
      feeling: null,
    });
    setCustomInputs({
      description: null,
      energy: null,
      location: null,
      feeling: null,
    });
    setShowResults(false);
  };

  const getProgress = () => {
    const answeredCount = Object.values(answers).filter(
      (answer) => answer !== null
    ).length;
    return (answeredCount / 4) * 100;
  };

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                EXPERIENCE QUIZ
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Answer 4 questions to find your perfect match
              </p>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between mb-2">
                  <span className="text-white/60 text-sm uppercase tracking-widest">
                    Progress
                  </span>
                  <span className="text-white text-sm font-bold">
                    {Object.values(answers).filter((a) => a !== null).length}/4
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            {showAllQuestions && (
              <div className="space-y-12">
                {questions.map((q, index) => (
                  <div
                    key={q.id}
                    className="bg-primary-charcoal rounded-2xl border border-white/10 p-8"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {q.question}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(q.id, option.value)}
                          className={`p-2 md:p-3 rounded-xl border transition-all duration-300 font-bold text-sm md:text-base ${
                            answers[q.id as keyof Answers] === option.value && !customInputs[q.id as keyof Answers]
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white border-white/20 hover:border-white/50"
                          }`}
                          style={{
                            boxShadow:
                              answers[q.id as keyof Answers] === option.value && !customInputs[q.id as keyof Answers]
                                ? "0 0 30px rgba(255, 255, 255, 0.15)"
                                : "none",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder="Or type your own answer..."
                        value={customInputs[q.id as keyof Answers] || ""}
                        onChange={(e) => handleCustomInputChange(q.id, e.target.value)}
                        className={`w-full bg-transparent text-white placeholder-white/40 px-4 py-3 rounded-xl border transition-all duration-300 outline-none ${
                          customInputs[q.id as keyof Answers]
                            ? "border-white"
                            : "border-white/10 hover:border-white/30 focus:border-white"
                        }`}
                        style={{
                          boxShadow: customInputs[q.id as keyof Answers]
                            ? "0 0 20px rgba(255, 255, 255, 0.1)"
                            : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center mt-12">
              <button
                onClick={handleShowResults}
                disabled={!allAnswered}
                className={`px-12 py-4 rounded-full font-bold uppercase tracking-widest text-lg transition-all duration-300 ${
                  allAnswered
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/20 text-white/40 cursor-not-allowed"
                }`}
                style={{
                  boxShadow: allAnswered
                    ? "0 0 40px rgba(255, 255, 255, 0.2)"
                    : "none",
                }}
              >
                See My Results
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Results */}
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm uppercase tracking-widest mb-6">
                Your Results
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                YOUR PERFECT MATCHES
              </h2>
              <p className="text-white/60 text-lg">
                Based on your quiz answers, here&apos;s what we recommend
              </p>
            </div>

            {/* Quiz Summary */}
            <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 mb-12">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
                Your Selections
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {questions.map((q) => {
                  const answer = answers[q.id as keyof Answers];
                  const matchedOption = q.options.find((opt) => opt.value === answer);
                  const displayValue = matchedOption?.label || answer;

                  return (
                    <div key={q.id}>
                      <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                        {q.question.split(" ")[0]}
                      </p>
                      <p className="text-white font-bold">
                        {displayValue}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {mockResults.map((result, index) => (
                <div
                  key={result.id}
                  className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300 group relative"
                  style={{
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255, 255, 255, 0.05)";
                  }}
                >
                  {/* Match Badge */}
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide">
                      Best Match
                    </div>
                  )}

                  {/* Image Placeholder */}
                  <div className="aspect-square bg-white/5 rounded-lg mb-4" />

                  {/* Content */}
                  <h4 className="text-white font-bold text-lg mb-2">
                    {result.name}
                  </h4>
                  <p className="text-white/60 text-sm mb-3">{result.type}</p>

                  {/* Match Score */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-sm uppercase tracking-widest">
                      Match
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{ width: `${result.matchScore}%` }}
                        />
                      </div>
                      <span className="text-white font-bold text-sm">
                        {result.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-white font-bold text-xl">{result.price}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={resetQuiz}
                className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide"
              >
                Retake Quiz
              </button>
              <button className="px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide">
                View All Details
              </button>
            </div>
          </>
        )}
      </div>
    </SectionContainer>
  );
}
