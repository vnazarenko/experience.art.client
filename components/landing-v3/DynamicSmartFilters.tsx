"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type EventType = "wedding" | "corporate" | "festival" | "party" | null;

const eventTypes = [
  { id: "wedding", label: "Wedding", icon: "💍" },
  { id: "corporate", label: "Corporate", icon: "💼" },
  { id: "festival", label: "Festival", icon: "🎪" },
  { id: "party", label: "Party", icon: "🎉" },
];

const filtersByEventType: Record<string, { vibe: string[]; space: string[]; sound: string[] }> = {
  wedding: {
    vibe: ["Elegant", "Romantic", "Soft Light", "Photoshoot-friendly"],
    space: ["Small Venue", "Medium Venue", "Large Venue"],
    sound: ["Quiet", "Moderate", "Loud OK"],
  },
  corporate: {
    vibe: ["Professional", "Innovative", "Networking", "High-tech"],
    space: ["Booth", "Hall", "Open Space"],
    sound: ["Low", "Medium", "High"],
  },
  festival: {
    vibe: ["Energetic", "Artistic", "Immersive", "Interactive"],
    space: ["Outdoor Stage", "Indoor Arena", "Mixed Venue"],
    sound: ["Loud", "Very Loud", "Festival Level"],
  },
  party: {
    vibe: ["Fun", "Wild", "Chill", "Exclusive"],
    space: ["Club", "Rooftop", "Private Venue"],
    sound: ["Party Level", "Club Level", "Background"],
  },
};

const budgetOptions = ["Under $5k", "$5k-$15k", "$15k-$50k", "$50k+"];

const mockExperiences = [
  { id: 1, name: "Elegant Light Installation", price: "$4,500" },
  { id: 2, name: "Interactive LED Wall", price: "$6,200" },
  { id: 3, name: "Projection Mapping Show", price: "$8,500" },
  { id: 4, name: "VR Experience Booth", price: "$3,800" },
];

export function DynamicSmartFilters() {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventType, setEventType] = useState<EventType>(null);
  const [vibe, setVibe] = useState<string | null>(null);
  const [space, setSpace] = useState<string | null>(null);
  const [sound, setSound] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  const steps = ["Event Type", "Vibe", "Space", "Sound Level", "Budget"];

  const handleEventTypeSelect = (type: EventType) => {
    setEventType(type);
    setVibe(null);
    setSpace(null);
    setSound(null);
    setBudget(null);
    setCurrentStep(1);
  };

  const handleVibeSelect = (v: string) => {
    setVibe(v);
    setCurrentStep(2);
  };

  const handleSpaceSelect = (s: string) => {
    setSpace(s);
    setCurrentStep(3);
  };

  const handleSoundSelect = (s: string) => {
    setSound(s);
    setCurrentStep(4);
  };

  const handleBudgetSelect = (b: string) => {
    setBudget(b);
    setCurrentStep(5);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 1) {
        setEventType(null);
      } else if (currentStep === 2) {
        setVibe(null);
      } else if (currentStep === 3) {
        setSpace(null);
      } else if (currentStep === 4) {
        setSound(null);
      } else if (currentStep === 5) {
        setBudget(null);
      }
    }
  };

  const resetFilters = () => {
    setCurrentStep(0);
    setEventType(null);
    setVibe(null);
    setSpace(null);
    setSound(null);
    setBudget(null);
  };

  const currentFilters = eventType ? filtersByEventType[eventType] : null;

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SMART FILTERS
          </h2>
          <p className="text-white/60 text-lg">
            Step-by-step filters to find your perfect experience
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep > index
                    ? "bg-white/30 text-white"
                    : currentStep === index
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {currentStep > index ? "✓" : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 transition-all duration-300 ${
                    currentStep > index ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Label */}
        <div className="text-center mb-8">
          <span className="text-white/40 text-sm uppercase tracking-widest">
            Step {currentStep + 1} of {steps.length}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2">
            {currentStep === 0 && "Select Event Type"}
            {currentStep === 1 && "Choose the Vibe"}
            {currentStep === 2 && "Select Space Size"}
            {currentStep === 3 && "Sound Level Preference"}
            {currentStep === 4 && "Set Your Budget"}
            {currentStep === 5 && "Your Selections"}
          </h3>
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {/* Step 0: Event Type */}
          {currentStep === 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleEventTypeSelect(type.id as EventType)}
                  className="p-4 md:p-5 rounded-xl border transition-all duration-300 text-center bg-[#1a1a1a] text-white border-white/10 hover:border-white/30 hover:bg-[#252525]"
                >
                  <div className="text-2xl md:text-3xl mb-2">{type.icon}</div>
                  <div className="text-sm md:text-base font-bold uppercase tracking-wide">
                    {type.label}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Step 1: Vibe */}
          {currentStep === 1 && currentFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {currentFilters.vibe.map((option) => (
                <button
                  key={option}
                  onClick={() => handleVibeSelect(option)}
                  className="p-4 md:p-5 rounded-xl border transition-all duration-300 text-center bg-[#1a1a1a] text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Space */}
          {currentStep === 2 && currentFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentFilters.space.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSpaceSelect(option)}
                  className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-[#1a1a1a] text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 3: Sound Level */}
          {currentStep === 3 && currentFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentFilters.sound.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSoundSelect(option)}
                  className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-[#1a1a1a] text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {budgetOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleBudgetSelect(option)}
                  className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-[#1a1a1a] text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Step 5: Results */}
          {currentStep === 5 && (
            <div>
              {/* Summary */}
              <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Event</p>
                    <p className="text-white font-bold text-sm">
                      {eventTypes.find((t) => t.id === eventType)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Vibe</p>
                    <p className="text-white font-bold text-sm">{vibe}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Space</p>
                    <p className="text-white font-bold text-sm">{space}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Sound</p>
                    <p className="text-white font-bold text-sm">{sound}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Budget</p>
                    <p className="text-white font-bold text-sm">{budget}</p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <h4 className="text-white text-xl font-bold uppercase tracking-widest mb-6 text-center">
                Matching Experiences ({mockExperiences.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-[#1a1a1a] rounded-xl border border-white/10 p-4 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="aspect-video bg-white/5 rounded-lg mb-3" />
                    <h5 className="text-white font-bold text-sm mb-1">{exp.name}</h5>
                    <p className="text-white/60 text-sm">{exp.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full border border-white/30 font-bold uppercase tracking-wide transition-all duration-300 ${
              currentStep === 0
                ? "text-white/30 cursor-not-allowed"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            Back
          </button>

          {currentStep === 5 ? (
            <button
              onClick={resetFilters}
              className="px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-bold uppercase tracking-wide"
            >
              Start Over
            </button>
          ) : (
            <div className="text-white/40 text-sm flex items-center">
              Select an option to continue
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
