"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type EventType = "wedding" | "corporate" | "festival" | "party" | "custom" | null;

// Geometric Abstraction SVG Icons - Modern Sophistication

// Two overlapping circles with heart-shaped intersection
const WeddingIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 md:w-10 md:h-10">
    <circle cx="11" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="21" cy="16" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    {/* Heart in the intersection */}
    <path d="M16 14c-1-2-3-2-4-1s-1 3 0 4l4 4 4-4c1-1 1-3 0-4s-3-1-4 1z" fill="currentColor"/>
  </svg>
);

// Ascending rectangles (growth chart)
const CorporateIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 md:w-10 md:h-10">
    <rect x="4" y="20" width="5" height="8" fill="currentColor" opacity="0.4"/>
    <rect x="11" y="14" width="5" height="14" fill="currentColor" opacity="0.6"/>
    <rect x="18" y="8" width="5" height="20" fill="currentColor" opacity="0.8"/>
    <rect x="25" y="4" width="5" height="24" fill="currentColor"/>
  </svg>
);

// Radiating triangles around central circle (sun/stage light)
const FestivalIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 md:w-10 md:h-10">
    <circle cx="16" cy="16" r="5" fill="currentColor"/>
    {/* Radiating triangles */}
    <polygon points="16,2 14,8 18,8" fill="currentColor" opacity="0.8"/>
    <polygon points="16,30 14,24 18,24" fill="currentColor" opacity="0.8"/>
    <polygon points="2,16 8,14 8,18" fill="currentColor" opacity="0.8"/>
    <polygon points="30,16 24,14 24,18" fill="currentColor" opacity="0.8"/>
    <polygon points="6,6 10,10 7,11" fill="currentColor" opacity="0.6"/>
    <polygon points="26,6 22,10 25,11" fill="currentColor" opacity="0.6"/>
    <polygon points="6,26 10,22 7,21" fill="currentColor" opacity="0.6"/>
    <polygon points="26,26 22,22 25,21" fill="currentColor" opacity="0.6"/>
  </svg>
);

// Scattered geometric confetti (triangles, circles, squares)
const PartyIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 md:w-10 md:h-10">
    {/* Squares */}
    <rect x="4" y="6" width="4" height="4" fill="currentColor" transform="rotate(15 6 8)"/>
    <rect x="22" y="4" width="5" height="5" fill="currentColor" opacity="0.7" transform="rotate(-10 24 6)"/>
    {/* Circles */}
    <circle cx="14" cy="8" r="3" fill="currentColor" opacity="0.8"/>
    <circle cx="8" cy="18" r="2" fill="currentColor" opacity="0.6"/>
    <circle cx="26" cy="16" r="2.5" fill="currentColor"/>
    {/* Triangles */}
    <polygon points="20,12 17,18 23,18" fill="currentColor" opacity="0.9"/>
    <polygon points="12,20 9,26 15,26" fill="currentColor" opacity="0.7"/>
    <polygon points="24,22 21,28 27,28" fill="currentColor" opacity="0.8"/>
    <polygon points="6,26 4,30 8,30" fill="currentColor" opacity="0.5"/>
  </svg>
);

const eventTypeIcons: Record<string, React.ReactNode> = {
  wedding: <WeddingIcon />,
  corporate: <CorporateIcon />,
  festival: <FestivalIcon />,
  party: <PartyIcon />,
};

const eventTypes = [
  { id: "wedding", label: "Wedding" },
  { id: "corporate", label: "Corporate" },
  { id: "festival", label: "Festival" },
  { id: "party", label: "Party" },
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

  // Custom input states
  const [customEventType, setCustomEventType] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [customSpace, setCustomSpace] = useState("");
  const [customSound, setCustomSound] = useState("");
  const [customBudget, setCustomBudget] = useState("");

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
    setCustomEventType("");
    setCustomVibe("");
    setCustomSpace("");
    setCustomSound("");
    setCustomBudget("");
  };

  // Custom input handlers
  const handleCustomEventSubmit = () => {
    if (customEventType.trim()) {
      setEventType("custom");
      setVibe(null);
      setSpace(null);
      setSound(null);
      setBudget(null);
      setCurrentStep(1);
    }
  };

  const handleCustomVibeSubmit = () => {
    if (customVibe.trim()) {
      setVibe(customVibe.trim());
      setCurrentStep(2);
    }
  };

  const handleCustomSpaceSubmit = () => {
    if (customSpace.trim()) {
      setSpace(customSpace.trim());
      setCurrentStep(3);
    }
  };

  const handleCustomSoundSubmit = () => {
    if (customSound.trim()) {
      setSound(customSound.trim());
      setCurrentStep(4);
    }
  };

  const handleCustomBudgetSubmit = () => {
    if (customBudget.trim()) {
      setBudget(customBudget.trim());
      setCurrentStep(5);
    }
  };

  // Get display labels for summary
  const getEventLabel = () => {
    if (eventType === "custom") return customEventType;
    return eventTypes.find((t) => t.id === eventType)?.label || "";
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
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleEventTypeSelect(type.id as EventType)}
                    className="p-4 md:p-5 rounded-xl border transition-all duration-300 text-center bg-primary-charcoal text-white border-white/10 hover:border-white/30 hover:bg-[#252525]"
                  >
                    <div className="flex justify-center mb-2">{eventTypeIcons[type.id]}</div>
                    <div className="text-sm md:text-base font-bold uppercase tracking-wide">
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
              {/* Custom input */}
              <div className="mt-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Or describe your event type..."
                    value={customEventType}
                    onChange={(e) => setCustomEventType(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customEventType.trim()) {
                        handleCustomEventSubmit();
                      }
                    }}
                    className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleCustomEventSubmit}
                    disabled={!customEventType.trim()}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                      customEventType.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Vibe */}
          {currentStep === 1 && (
            <div>
              {currentFilters && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentFilters.vibe.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleVibeSelect(option)}
                      className="p-4 md:p-5 rounded-xl border transition-all duration-300 text-center bg-primary-charcoal text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {/* Custom input */}
              <div className={currentFilters ? "mt-6" : ""}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Or describe your vibe..."
                    value={customVibe}
                    onChange={(e) => setCustomVibe(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customVibe.trim()) {
                        handleCustomVibeSubmit();
                      }
                    }}
                    className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleCustomVibeSubmit}
                    disabled={!customVibe.trim()}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                      customVibe.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Space */}
          {currentStep === 2 && (
            <div>
              {currentFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentFilters.space.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSpaceSelect(option)}
                      className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-primary-charcoal text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {/* Custom input */}
              <div className={currentFilters ? "mt-6" : ""}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Or describe your space..."
                    value={customSpace}
                    onChange={(e) => setCustomSpace(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customSpace.trim()) {
                        handleCustomSpaceSubmit();
                      }
                    }}
                    className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleCustomSpaceSubmit}
                    disabled={!customSpace.trim()}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                      customSpace.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Sound Level */}
          {currentStep === 3 && (
            <div>
              {currentFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentFilters.sound.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSoundSelect(option)}
                      className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-primary-charcoal text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {/* Custom input */}
              <div className={currentFilters ? "mt-6" : ""}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Or describe your sound preference..."
                    value={customSound}
                    onChange={(e) => setCustomSound(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customSound.trim()) {
                        handleCustomSoundSubmit();
                      }
                    }}
                    className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleCustomSoundSubmit}
                    disabled={!customSound.trim()}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                      customSound.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {budgetOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleBudgetSelect(option)}
                    className="p-5 md:p-6 rounded-xl border transition-all duration-300 text-center bg-primary-charcoal text-white border-white/10 hover:border-white/30 hover:bg-[#252525] font-bold text-lg"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* Custom input */}
              <div className="mt-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Or enter your budget..."
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && customBudget.trim()) {
                        handleCustomBudgetSubmit();
                      }
                    }}
                    className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                  />
                  <button
                    onClick={handleCustomBudgetSubmit}
                    disabled={!customBudget.trim()}
                    className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                      customBudget.trim()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Results */}
          {currentStep === 5 && (
            <div>
              {/* Summary */}
              <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Event</p>
                    <p className="text-white font-bold text-sm">
                      {getEventLabel()}
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
                    className="bg-primary-charcoal rounded-xl border border-white/10 p-4 hover:border-white/30 transition-all duration-300"
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
