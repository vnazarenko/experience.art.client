"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type EventType = "birthday" | "corporate" | "wedding" | "festival" | null;
type Vibe =
  | "wow"
  | "futuristic"
  | "art"
  | "epic"
  | "calm"
  | "interactive"
  | null;
type Budget = "under1k" | "1k-5k" | "5k-20k" | "20k+" | null;

const eventTypes = [
  { id: "birthday", label: "Birthday Party", icon: "🎂" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "wedding", label: "Wedding", icon: "💍" },
  { id: "festival", label: "Festival", icon: "🎪" },
];

const vibes = [
  { id: "wow", label: "WOW Factor" },
  { id: "futuristic", label: "Futuristic" },
  { id: "art", label: "Art Installation" },
  { id: "epic", label: "Epic Show" },
  { id: "calm", label: "Calm/Elegant" },
  { id: "interactive", label: "Interactive" },
];

const budgets = [
  { id: "under1k", label: "Under $1,000" },
  { id: "1k-5k", label: "$1,000–$5,000" },
  { id: "5k-20k", label: "$5,000–$20,000" },
  { id: "20k+", label: "$20,000+" },
];

const mockExperiences = [
  { id: 1, name: "Laser Sculpture Show", type: "Performance", price: "$3,500" },
  {
    id: 2,
    name: "Interactive LED Floor",
    type: "Installation",
    price: "$2,800",
  },
  {
    id: 3,
    name: "Holographic DJ Booth",
    type: "Tech Experience",
    price: "$4,200",
  },
];

export function WizardFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventType, setEventType] = useState<EventType>(null);
  const [vibe, setVibe] = useState<Vibe>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const canProceed = () => {
    if (currentStep === 1) return eventType !== null;
    if (currentStep === 2) return vibe !== null;
    if (currentStep === 3) return budget !== null;
    return false;
  };

  const handleNext = () => {
    if (canProceed() && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setEventType(null);
    setVibe(null);
    setBudget(null);
  };

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            FIND YOUR EXPERIENCE
          </h2>
          <p className="text-white/60 text-lg">
            Answer 3 quick questions to get matched
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((step) => (
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
              {step < 4 && (
                <div
                  className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    currentStep > step ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px] h-min">
          {/* Step 1: Event Type */}
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                WHAT TYPE OF EVENT?
              </h3>
              <p className="text-white/60 text-center mb-8">
                Select your event type
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEventType(type.id as EventType)}
                    className={`p-4 md:p-5 rounded-xl border transition-all duration-300 text-center ${
                      eventType === type.id
                        ? "bg-white text-black border-white"
                        : "bg-primary-charcoal text-white border-white/10 hover:border-white/30"
                    }`}
                    style={{
                      boxShadow:
                        eventType === type.id
                          ? "0 0 30px rgba(255, 255, 255, 0.2)"
                          : "none",
                    }}
                  >
                    <div className="text-2xl md:text-3xl mb-2">{type.icon}</div>
                    <div className="text-sm md:text-base font-bold uppercase tracking-wide">
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Vibe */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                WHAT'S THE VIBE?
              </h3>
              <p className="text-white/60 text-center mb-8">
                Choose the atmosphere you want
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVibe(v.id as Vibe)}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${
                      vibe === v.id
                        ? "bg-white text-black border-white"
                        : "bg-primary-charcoal text-white border-white/10 hover:border-white/30"
                    }`}
                    style={{
                      boxShadow:
                        vibe === v.id
                          ? "0 0 40px rgba(255, 255, 255, 0.2)"
                          : "none",
                    }}
                  >
                    <div className="text-lg font-bold uppercase tracking-wide">
                      {v.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                WHAT'S YOUR BUDGET?
              </h3>
              <p className="text-white/60 text-center mb-8">
                Select your budget range
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id as Budget)}
                    className={`p-8 rounded-2xl border transition-all duration-300 ${
                      budget === b.id
                        ? "bg-white text-black border-white"
                        : "bg-primary-charcoal text-white border-white/10 hover:border-white/30"
                    }`}
                    style={{
                      boxShadow:
                        budget === b.id
                          ? "0 0 40px rgba(255, 255, 255, 0.2)"
                          : "none",
                    }}
                  >
                    <div className="text-2xl font-bold">{b.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                YOUR MATCHED EXPERIENCES
              </h3>
              <p className="text-white/60 text-center mb-8">
                Based on your selections, here are our recommendations
              </p>

              {/* Summary */}
              <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
                      Event
                    </p>
                    <p className="text-white font-bold">
                      {eventTypes.find((t) => t.id === eventType)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
                      Vibe
                    </p>
                    <p className="text-white font-bold">
                      {vibes.find((v) => v.id === vibe)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-1">
                      Budget
                    </p>
                    <p className="text-white font-bold">
                      {budgets.find((b) => b.id === budget)?.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {mockExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300"
                    style={{
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div className="aspect-video bg-white/5 rounded-lg mb-4" />
                    <h4 className="text-white font-bold text-lg mb-2">
                      {exp.name}
                    </h4>
                    <p className="text-white/60 text-sm mb-3">{exp.type}</p>
                    <p className="text-white font-bold text-xl">{exp.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={resetWizard}
                  className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide"
                >
                  Start Over
                </button>
                <button className="px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide">
                  View All Matches
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {currentStep < 4 && (
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
              disabled={!canProceed()}
              className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                canProceed()
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/20 text-white/40 cursor-not-allowed"
              }`}
            >
              {currentStep === 3 ? "Show Results" : "Next"}
            </button>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
