"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type Question = "people" | "venue" | "budget" | "goal";

type Answers = {
  people: string | null;
  venue: string | null;
  budget: string | null;
  goal: string | null;
};

const questions = {
  people: {
    label: "How many people?",
    options: ["<50", "50-150", "150-500", "500+"],
  },
  venue: {
    label: "Venue type?",
    options: ["Indoor", "Outdoor", "Both", "Not sure"],
  },
  budget: {
    label: "Budget range?",
    options: ["Low", "Medium", "Premium"],
  },
  goal: {
    label: "What's your goal?",
    options: ["WOW guests", "Make photos", "Interactive", "Calm elegance"],
  },
};

const mockResults = [
  {
    id: 1,
    name: "Interactive LED Wall",
    type: "Installation",
    match: "95%",
    reason: "Perfect for interactive experiences with medium groups",
  },
  {
    id: 2,
    name: "Holographic Performer",
    type: "Performance",
    match: "92%",
    reason: "Creates WOW factor and works indoors",
  },
  {
    id: 3,
    name: "360° Photo Booth",
    type: "Interactive",
    match: "88%",
    reason: "Great for making memorable photos",
  },
];

export function AIAutoFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>("people");
  const [answers, setAnswers] = useState<Answers>({
    people: null,
    venue: null,
    budget: null,
    goal: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const questionOrder: Question[] = ["people", "venue", "budget", "goal"];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    const currentIndex = questionOrder.indexOf(currentQuestion);
    if (currentIndex < questionOrder.length - 1) {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestion(questionOrder[currentIndex + 1]);
      }, 300);
    } else {
      // All questions answered, show loading
      setTimeout(() => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setShowResults(true);
        }, 2500);
      }, 300);
    }
  };

  const resetModal = () => {
    setCurrentQuestion("people");
    setAnswers({
      people: null,
      venue: null,
      budget: null,
      goal: null,
    });
    setIsLoading(false);
    setShowResults(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(resetModal, 300);
  };

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-4xl mx-auto">
        {/* Initial State */}
        {!isModalOpen && (
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/60 text-sm uppercase tracking-widest mb-6">
                Powered by AI
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                AI RECOMMENDER
              </h2>
              <p className="text-white/60 text-lg mb-2">
                Let our AI find the perfect experiences for your event
              </p>
              <p className="text-white/80 text-sm">
                Answer 4 quick questions and get personalized recommendations
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-4 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-widest text-lg"
              style={{
                boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)",
              }}
            >
              Start AI Matchmaking
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wide">
                  Fast
                </h3>
                <p className="text-white/60 text-sm">
                  Get recommendations in seconds
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wide">
                  Accurate
                </h3>
                <p className="text-white/60 text-sm">
                  Tailored to your needs
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="text-white font-bold mb-2 uppercase tracking-wide">
                  Smart
                </h3>
                <p className="text-white/60 text-sm">
                  AI-powered matching
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 p-6 flex items-center justify-between">
                <h3 className="text-white font-bold uppercase tracking-widest">
                  AI Matchmaking
                </h3>
                <button
                  onClick={closeModal}
                  className="text-white/60 hover:text-white text-2xl leading-none transition-colors duration-300"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {!isLoading && !showResults && (
                  <div>
                    {/* Progress */}
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60 text-sm uppercase tracking-widest">
                          Question {questionOrder.indexOf(currentQuestion) + 1}{" "}
                          of 4
                        </span>
                        <span className="text-white/60 text-sm">
                          {Math.round(
                            ((questionOrder.indexOf(currentQuestion) + 1) / 4) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white transition-all duration-500"
                          style={{
                            width: `${
                              ((questionOrder.indexOf(currentQuestion) + 1) /
                                4) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                      {questions[currentQuestion].label}
                    </h4>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {questions[currentQuestion].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="p-6 rounded-2xl border border-white/10 bg-transparent text-white hover:border-white hover:bg-white hover:text-black transition-all duration-300 font-bold text-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {/* Back Button */}
                    {questionOrder.indexOf(currentQuestion) > 0 && (
                      <button
                        onClick={() => {
                          const currentIndex =
                            questionOrder.indexOf(currentQuestion);
                          setCurrentQuestion(questionOrder[currentIndex - 1]);
                        }}
                        className="mt-6 text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-300"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="mb-8">
                      <div className="inline-block w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      Matching your perfect set...
                    </h4>
                    <p className="text-white/60">
                      Analyzing your preferences with AI
                    </p>
                  </div>
                )}

                {/* Results */}
                {showResults && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="text-4xl mb-4">✨</div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        We Found {mockResults.length} Perfect Matches
                      </h4>
                      <p className="text-white/60">
                        Based on your preferences
                      </p>
                    </div>

                    {/* Results Grid */}
                    <div className="space-y-4 mb-8">
                      {mockResults.map((result) => (
                        <div
                          key={result.id}
                          className="bg-black/40 rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h5 className="text-white font-bold text-lg mb-1">
                                {result.name}
                              </h5>
                              <p className="text-white/60 text-sm">
                                {result.type}
                              </p>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white text-black font-bold text-sm">
                              {result.match}
                            </div>
                          </div>
                          <p className="text-white/80 text-sm">
                            {result.reason}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <button
                        onClick={resetModal}
                        className="flex-1 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide"
                      >
                        Start Over
                      </button>
                      <button
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
