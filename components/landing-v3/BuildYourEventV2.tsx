"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

// Types
type QuizStep = "eventType" | "guestCount" | "budget" | "vibe" | "zones" | "experiences";

type QuizAnswers = {
  eventType: string | null;
  guestCount: string | null;
  budget: string | null;
  vibe: string[];
  zones: string[];
};

type CustomInputs = {
  eventType: string;
  guestCount: string;
  budget: string;
  vibe: string;
  zones: string;
};

// Quiz Questions Data
const quizQuestions = {
  eventType: {
    title: "What type of event are you planning?",
    subtitle: "Select one option",
    options: [
      { id: "wedding", label: "Wedding" },
      { id: "corporate", label: "Corporate Event" },
      { id: "festival", label: "Festival" },
      { id: "party", label: "Private Party" },
      { id: "gala", label: "Gala / Award Show" },
    ],
    multiSelect: false,
  },
  guestCount: {
    title: "How many guests are you expecting?",
    subtitle: "Select one option",
    options: [
      { id: "small", label: "Under 50" },
      { id: "medium", label: "50 - 150" },
      { id: "large", label: "150 - 500" },
      { id: "xlarge", label: "500+" },
    ],
    multiSelect: false,
  },
  budget: {
    title: "What's your budget range?",
    subtitle: "Select one option",
    options: [
      { id: "starter", label: "Under $5,000" },
      { id: "standard", label: "$5,000 - $15,000" },
      { id: "premium", label: "$15,000 - $50,000" },
      { id: "luxury", label: "$50,000+" },
    ],
    multiSelect: false,
  },
  vibe: {
    title: "What vibe are you going for?",
    subtitle: "Select all that apply",
    options: [
      { id: "elegant", label: "Elegant" },
      { id: "energetic", label: "Energetic" },
      { id: "futuristic", label: "Futuristic" },
      { id: "artistic", label: "Artistic" },
      { id: "interactive", label: "Interactive" },
      { id: "intimate", label: "Intimate" },
      { id: "spectacular", label: "Spectacular" },
      { id: "immersive", label: "Immersive" },
    ],
    multiSelect: true,
  },
  zones: {
    title: "What parts of your event need experiences?",
    subtitle: "Select all that apply",
    options: [
      { id: "welcome", label: "Welcome Experience", description: "Set the tone as guests arrive" },
      { id: "mainShow", label: "Main Show", description: "The centerpiece of your event" },
      { id: "interaction", label: "Interaction Zone", description: "Keep guests engaged" },
      { id: "closing", label: "Closing Moment", description: "End with a memorable finale" },
    ],
    multiSelect: true,
  },
};

// Experiences by Zone
const experiencesByZone: Record<string, { id: string; label: string; price: string; tags: string[] }[]> = {
  welcome: [
    { id: "light-install", label: "Light Installation", price: "$1,200", tags: ["elegant", "artistic", "immersive"] },
    { id: "soft-music", label: "Soft Music Performer", price: "$800", tags: ["elegant", "intimate"] },
    { id: "holo-logo", label: "Holographic Logo", price: "$2,500", tags: ["futuristic", "spectacular"] },
    { id: "led-tunnel", label: "LED Welcome Tunnel", price: "$3,200", tags: ["spectacular", "immersive", "futuristic"] },
    { id: "aroma-experience", label: "Aroma Experience", price: "$600", tags: ["intimate", "immersive", "elegant"] },
  ],
  mainShow: [
    { id: "laser-show", label: "Laser Show", price: "$4,500", tags: ["spectacular", "energetic", "futuristic"] },
    { id: "performer-duo", label: "Performer Duo", price: "$3,200", tags: ["artistic", "elegant"] },
    { id: "kinetic-sculpture", label: "Giant Kinetic Sculpture", price: "$6,800", tags: ["artistic", "spectacular", "immersive"] },
    { id: "fire-show", label: "Fire Show", price: "$2,800", tags: ["energetic", "spectacular"] },
    { id: "drone-show", label: "Indoor Drone Show", price: "$8,500", tags: ["futuristic", "spectacular"] },
    { id: "projection-mapping", label: "Projection Mapping", price: "$5,500", tags: ["immersive", "artistic", "futuristic"] },
  ],
  interaction: [
    { id: "vr-booth", label: "VR Booth", price: "$3,500", tags: ["futuristic", "interactive", "immersive"] },
    { id: "photo-install", label: "Photo Installation", price: "$1,800", tags: ["interactive", "artistic"] },
    { id: "ai-art", label: "AI Art Generator", price: "$2,200", tags: ["futuristic", "interactive", "artistic"] },
    { id: "mirror-booth", label: "360° Mirror Booth", price: "$2,000", tags: ["interactive", "spectacular"] },
    { id: "touch-wall", label: "Interactive Touch Wall", price: "$4,200", tags: ["futuristic", "interactive", "immersive"] },
  ],
  closing: [
    { id: "light-fade", label: "Slow Light Fade", price: "$600", tags: ["elegant", "intimate"] },
    { id: "finale-perf", label: "Finale Performance", price: "$2,400", tags: ["spectacular", "energetic"] },
    { id: "confetti-tunnel", label: "Confetti Tunnel", price: "$900", tags: ["energetic", "spectacular"] },
    { id: "fireworks-indoor", label: "Indoor Fireworks", price: "$3,500", tags: ["spectacular", "energetic"] },
    { id: "lantern-release", label: "LED Lantern Release", price: "$1,800", tags: ["elegant", "intimate", "spectacular"] },
  ],
};

// Default experiences for custom zones
const defaultExperiences = [
  { id: "custom-light", label: "Light Installation", price: "$2,500", tags: ["elegant", "artistic", "immersive"] },
  { id: "custom-performer", label: "Live Performer", price: "$3,000", tags: ["energetic", "spectacular", "artistic"] },
  { id: "custom-interactive", label: "Interactive Experience", price: "$2,800", tags: ["interactive", "futuristic", "immersive"] },
  { id: "custom-photo", label: "Photo Opportunity", price: "$1,500", tags: ["interactive", "artistic"] },
  { id: "custom-projection", label: "Projection Show", price: "$4,000", tags: ["spectacular", "immersive", "futuristic"] },
  { id: "custom-sound", label: "Sound Experience", price: "$1,800", tags: ["immersive", "intimate", "artistic"] },
  { id: "custom-tech", label: "Tech Installation", price: "$3,500", tags: ["futuristic", "interactive", "spectacular"] },
  { id: "custom-ambient", label: "Ambient Design", price: "$1,200", tags: ["elegant", "intimate", "immersive"] },
];

const zoneInfo: Record<string, { title: string; description: string }> = {
  welcome: { title: "Welcome Experience", description: "Set the tone as guests arrive" },
  mainShow: { title: "Main Show", description: "The centerpiece of your event" },
  interaction: { title: "Interaction Zone", description: "Keep guests engaged" },
  closing: { title: "Closing Moment", description: "End with a memorable finale" },
};

// Helper to get zone info with fallback for custom zones
const getZoneInfo = (zoneId: string) => {
  if (zoneInfo[zoneId]) {
    return zoneInfo[zoneId];
  }
  // For custom zones, use the zone name as title
  return {
    title: zoneId,
    description: "Custom zone - select experiences that fit your vision"
  };
};

export function BuildYourEventV2() {
  // Quiz State
  const [currentStep, setCurrentStep] = useState<QuizStep>("eventType");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    eventType: null,
    guestCount: null,
    budget: null,
    vibe: [],
    zones: [],
  });
  const [customInputs, setCustomInputs] = useState<CustomInputs>({
    eventType: "",
    guestCount: "",
    budget: "",
    vibe: "",
    zones: "",
  });

  // Experience Selection State
  const [selectedExperiences, setSelectedExperiences] = useState<Record<string, string[]>>({});

  const stepOrder: QuizStep[] = ["eventType", "guestCount", "budget", "vibe", "zones", "experiences"];

  // Quiz Handlers
  const handleSingleSelect = (step: "eventType" | "guestCount" | "budget", value: string) => {
    setQuizAnswers((prev) => ({ ...prev, [step]: value }));
    setCustomInputs((prev) => ({ ...prev, [step]: "" }));
    // Auto advance after short delay
    setTimeout(() => {
      const currentIndex = stepOrder.indexOf(step);
      if (currentIndex < stepOrder.length - 1) {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
    }, 300);
  };

  const handleMultiSelect = (step: "vibe" | "zones", value: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [step]: prev[step].includes(value)
        ? prev[step].filter((v) => v !== value)
        : [...prev[step], value],
    }));
  };

  const handleCustomInputChange = (step: keyof CustomInputs, value: string) => {
    setCustomInputs((prev) => ({ ...prev, [step]: value }));
  };

  const handleCustomSubmit = (step: QuizStep) => {
    const customValue = customInputs[step as keyof CustomInputs];
    if (!customValue.trim()) return;

    if (step === "vibe" || step === "zones") {
      // For multi-select, add to array
      if (!quizAnswers[step].includes(customValue.trim())) {
        setQuizAnswers((prev) => ({
          ...prev,
          [step]: [...prev[step], customValue.trim()],
        }));
      }
      setCustomInputs((prev) => ({ ...prev, [step]: "" }));
    } else {
      // For single select
      setQuizAnswers((prev) => ({ ...prev, [step]: customValue.trim() }));
      setCustomInputs((prev) => ({ ...prev, [step]: "" }));
      setTimeout(() => {
        const currentIndex = stepOrder.indexOf(step);
        if (currentIndex < stepOrder.length - 1) {
          setCurrentStep(stepOrder[currentIndex + 1]);
        }
      }, 300);
    }
  };

  const goToNextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "eventType":
        return quizAnswers.eventType !== null;
      case "guestCount":
        return quizAnswers.guestCount !== null;
      case "budget":
        return quizAnswers.budget !== null;
      case "vibe":
        return quizAnswers.vibe.length > 0;
      case "zones":
        return quizAnswers.zones.length > 0;
      default:
        return true;
    }
  };

  // Experience Handlers
  const toggleExperience = (zone: string, experienceId: string) => {
    setSelectedExperiences((prev) => {
      const zoneExperiences = prev[zone] || [];
      if (zoneExperiences.includes(experienceId)) {
        return { ...prev, [zone]: zoneExperiences.filter((id) => id !== experienceId) };
      } else {
        return { ...prev, [zone]: [...zoneExperiences, experienceId] };
      }
    });
  };

  const getFilteredExperiences = (zone: string) => {
    // Use default experiences for custom zones (zones not in experiencesByZone)
    const experiences = experiencesByZone[zone] || defaultExperiences;
    const selectedVibes = quizAnswers.vibe;

    if (selectedVibes.length === 0) return experiences;

    // Sort by relevance (number of matching tags)
    return [...experiences].sort((a, b) => {
      const aMatches = a.tags.filter((tag) => selectedVibes.includes(tag)).length;
      const bMatches = b.tags.filter((tag) => selectedVibes.includes(tag)).length;
      return bMatches - aMatches;
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(selectedExperiences).forEach(([zone, experienceIds]) => {
      experienceIds.forEach((expId) => {
        // Check both zone-specific and default experiences
        const experiences = experiencesByZone[zone] || defaultExperiences;
        const experience = experiences.find((e) => e.id === expId);
        if (experience) {
          total += parseInt(experience.price.replace(/[$,]/g, ""));
        }
      });
    });
    return total;
  };

  const getTotalExperienceCount = () => {
    return Object.values(selectedExperiences).flat().length;
  };

  const resetAll = () => {
    setCurrentStep("eventType");
    setQuizAnswers({
      eventType: null,
      guestCount: null,
      budget: null,
      vibe: [],
      zones: [],
    });
    setCustomInputs({
      eventType: "",
      guestCount: "",
      budget: "",
      vibe: "",
      zones: "",
    });
    setSelectedExperiences({});
  };

  const currentStepIndex = stepOrder.indexOf(currentStep);
  const isQuizPhase = currentStep !== "experiences";

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BUILD YOUR EVENT
          </h2>
          <p className="text-white/60 text-lg">
            {isQuizPhase
              ? "Answer a few questions to get personalized experience recommendations"
              : "Select experiences for each part of your event"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          {stepOrder.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStepIndex > index
                    ? "bg-white/30 text-white"
                    : currentStepIndex === index
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {currentStepIndex > index ? "✓" : index + 1}
              </div>
              {index < stepOrder.length - 1 && (
                <div
                  className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 transition-all duration-300 ${
                    currentStepIndex > index ? "bg-white/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Quiz Phase */}
        {isQuizPhase && (
          <div className="max-w-3xl mx-auto">
            {/* Question Card */}
            <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-8 md:p-12">
              {/* Step Label */}
              <div className="text-center mb-8">
                <span className="text-white/40 text-sm uppercase tracking-widest">
                  Step {currentStepIndex + 1} of {stepOrder.length}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {quizQuestions[currentStep as keyof typeof quizQuestions]?.title}
                </h3>
                <p className="text-white/60 mt-2">
                  {quizQuestions[currentStep as keyof typeof quizQuestions]?.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-6">
                  <div className={`grid gap-3 ${
                    currentStep === "vibe" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
                  }`}>
                    {quizQuestions[currentStep as keyof typeof quizQuestions]?.options.map((option) => {
                      const isMultiSelect = currentStep === "vibe" || currentStep === "zones";
                      const isSelected = isMultiSelect
                        ? quizAnswers[currentStep as "vibe" | "zones"].includes(option.id)
                        : quizAnswers[currentStep as "eventType" | "guestCount" | "budget"] === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() =>
                            isMultiSelect
                              ? handleMultiSelect(currentStep as "vibe" | "zones", option.id)
                              : handleSingleSelect(currentStep as "eventType" | "guestCount" | "budget", option.id)
                          }
                          className={`p-4 md:p-5 rounded-xl border transition-all duration-300 text-left ${
                            isSelected
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white border-white/20 hover:border-white/50"
                          }`}
                          style={{
                            boxShadow: isSelected ? "0 0 30px rgba(255, 255, 255, 0.15)" : "none",
                          }}
                        >
                          <div className="font-bold">{option.label}</div>
                          {"description" in option && (
                            <div className={`text-sm mt-1 ${isSelected ? "text-black/60" : "text-white/60"}`}>
                              {(option as { description?: string }).description}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Input */}
                  <div className="mt-6">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder={`Or type your own ${currentStep === "zones" ? "zone" : "answer"}...`}
                        value={customInputs[currentStep as keyof CustomInputs]}
                        onChange={(e) => handleCustomInputChange(currentStep as keyof CustomInputs, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCustomSubmit(currentStep);
                          }
                        }}
                        className="flex-1 bg-transparent text-white placeholder-white/40 px-5 py-4 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300"
                      />
                      <button
                        onClick={() => handleCustomSubmit(currentStep)}
                        disabled={!customInputs[currentStep as keyof CustomInputs].trim()}
                        className={`px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                          customInputs[currentStep as keyof CustomInputs].trim()
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        }`}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Selected Tags for Multi-select */}
                  {(currentStep === "vibe" || currentStep === "zones") && quizAnswers[currentStep].length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-white/60 text-sm mb-2">Selected:</div>
                      <div className="flex flex-wrap gap-2">
                        {quizAnswers[currentStep].map((item) => {
                          const option = quizQuestions[currentStep]?.options.find((o) => o.id === item);
                          return (
                            <button
                              key={item}
                              onClick={() => handleMultiSelect(currentStep, item)}
                              className="px-3 py-1 rounded-full bg-white text-black text-sm font-bold flex items-center gap-2 hover:bg-white/90 transition-all duration-300"
                            >
                              {option?.label || item}
                              <span className="text-lg leading-none">x</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                <button
                  onClick={goToPreviousStep}
                  disabled={currentStepIndex === 0}
                  className={`px-6 py-3 rounded-full border border-white/30 font-bold uppercase tracking-wide transition-all duration-300 ${
                    currentStepIndex === 0
                      ? "text-white/30 cursor-not-allowed"
                      : "text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Back
                </button>

                {(currentStep === "vibe" || currentStep === "zones") && (
                  <button
                    onClick={goToNextStep}
                    disabled={!canProceed()}
                    className={`px-8 py-3 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                      canProceed()
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-white/20 text-white/40 cursor-not-allowed"
                    }`}
                  >
                    {currentStep === "zones" ? "Show Experiences" : "Next"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Experience Selection Phase */}
        {currentStep === "experiences" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Experience Sections */}
            <div className="lg:col-span-2 space-y-8">
              {quizAnswers.zones.map((zoneId) => {
                const zone = getZoneInfo(zoneId);
                const experiences = getFilteredExperiences(zoneId);
                const zoneSelections = selectedExperiences[zoneId] || [];

                return (
                  <div
                    key={zoneId}
                    className="bg-primary-charcoal rounded-2xl border border-white/10 p-8"
                  >
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">{zone.title}</h3>
                        {zoneSelections.length > 0 && (
                          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                            {zoneSelections.length} selected
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 mt-1">{zone.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {experiences.map((experience) => {
                        const isSelected = zoneSelections.includes(experience.id);
                        const matchingTags = experience.tags.filter((tag) =>
                          quizAnswers.vibe.includes(tag)
                        );

                        return (
                          <button
                            key={experience.id}
                            onClick={() => toggleExperience(zoneId, experience.id)}
                            className={`p-5 rounded-xl border transition-all duration-300 text-left ${
                              isSelected
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white border-white/20 hover:border-white/50"
                            }`}
                            style={{
                              boxShadow: isSelected
                                ? "0 0 30px rgba(255, 255, 255, 0.15)"
                                : "none",
                            }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-lg">{experience.label}</h4>
                              <div
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? "bg-black border-black"
                                    : "border-white/30"
                                }`}
                              >
                                {isSelected && (
                                  <span className="text-white text-sm">✓</span>
                                )}
                              </div>
                            </div>
                            <p className={`text-xl font-bold mb-2 ${isSelected ? "text-black" : "text-white"}`}>
                              {experience.price}
                            </p>
                            {matchingTags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {matchingTags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`px-2 py-0.5 rounded text-xs ${
                                      isSelected
                                        ? "bg-black/10 text-black/70"
                                        : "bg-white/10 text-white/70"
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Back to Quiz Button */}
              <button
                onClick={() => setCurrentStep("zones")}
                className="text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-300"
              >
                ← Back to Questions
              </button>
            </div>

            {/* Right Column - Summary Panel */}
            <div className="lg:col-span-1">
              <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-8 sticky top-8">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">
                  Your Event Summary
                </h3>

                {getTotalExperienceCount() === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✨</div>
                    <p className="text-white/60">
                      Start building your event by selecting experiences
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Selected Experiences by Zone */}
                    <div className="space-y-4 mb-8">
                      {quizAnswers.zones.map((zoneId) => {
                        const zone = getZoneInfo(zoneId);
                        const zoneSelections = selectedExperiences[zoneId] || [];

                        return (
                          <div key={zoneId} className="pb-4 border-b border-white/10 last:border-0">
                            <div className="text-white/60 text-xs uppercase tracking-widest mb-2">
                              {zone.title}
                            </div>
                            {zoneSelections.length > 0 ? (
                              <div className="space-y-2">
                                {zoneSelections.map((expId) => {
                                  // Check both zone-specific and default experiences
                                  const experiences = experiencesByZone[zoneId] || defaultExperiences;
                                  const exp = experiences.find((e) => e.id === expId);
                                  if (!exp) return null;
                                  return (
                                    <div key={expId} className="flex justify-between items-start">
                                      <span className="text-white text-sm">{exp.label}</span>
                                      <span className="text-white/80 text-sm">{exp.price}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-white/40 text-sm">Not selected</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Total Price */}
                    <div className="bg-black/40 rounded-xl p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 uppercase tracking-widest text-sm">
                          Estimated Total
                        </span>
                        <span className="text-white font-bold text-2xl">
                          ${getTotalPrice().toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Experience Count */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60 text-xs uppercase tracking-widest">
                          Experiences Selected
                        </span>
                        <span className="text-white text-xs font-bold">
                          {getTotalExperienceCount()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        disabled={getTotalExperienceCount() === 0}
                        className={`w-full px-6 py-4 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                          getTotalExperienceCount() > 0
                            ? "bg-white text-black hover:bg-white/90"
                            : "bg-white/20 text-white/40 cursor-not-allowed"
                        }`}
                        style={{
                          boxShadow:
                            getTotalExperienceCount() > 0
                              ? "0 0 30px rgba(255, 255, 255, 0.15)"
                              : "none",
                        }}
                      >
                        Estimate
                      </button>

                      <button
                        onClick={resetAll}
                        className="w-full px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide text-sm"
                      >
                        Start Over
                      </button>
                    </div>

                    {/* Quiz Summary */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="text-white/60 text-xs uppercase tracking-widest mb-3">
                        Your Preferences
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Event:</span>
                          <span className="text-white">{quizAnswers.eventType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Guests:</span>
                          <span className="text-white">{quizAnswers.guestCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Budget:</span>
                          <span className="text-white">{quizAnswers.budget}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Vibe:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {quizAnswers.vibe.map((v) => (
                              <span key={v} className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-xs">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
