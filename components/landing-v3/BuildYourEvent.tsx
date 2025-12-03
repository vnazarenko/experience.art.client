"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type Selection = {
  welcome: string | null;
  mainShow: string | null;
  interaction: string | null;
  closing: string | null;
};

const sections = {
  welcome: {
    title: "Welcome Experience",
    description: "Set the tone as guests arrive",
    options: [
      { id: "light", label: "Light Installation", price: "$1,200" },
      { id: "music", label: "Soft Music Performer", price: "$800" },
      { id: "hologram", label: "Holographic Logo", price: "$2,500" },
    ],
  },
  mainShow: {
    title: "Main Show",
    description: "The centerpiece of your event",
    options: [
      { id: "laser", label: "Laser Show", price: "$4,500" },
      { id: "performer", label: "Performer Duo", price: "$3,200" },
      { id: "sculpture", label: "Giant Kinetic Sculpture", price: "$6,800" },
      { id: "fire", label: "Fire Show", price: "$2,800" },
    ],
  },
  interaction: {
    title: "Interaction Zone",
    description: "Keep guests engaged",
    options: [
      { id: "vr", label: "VR Booth", price: "$3,500" },
      { id: "photo", label: "Photo Installation", price: "$1,800" },
      { id: "ai-art", label: "AI Art Generator", price: "$2,200" },
    ],
  },
  closing: {
    title: "Closing Moment",
    description: "End with a memorable finale",
    options: [
      { id: "fade", label: "Slow Light Fade", price: "$600" },
      { id: "finale", label: "Finale Performance", price: "$2,400" },
      { id: "confetti", label: "Confetti Tunnel", price: "$900" },
    ],
  },
};

export function BuildYourEvent() {
  const [selections, setSelections] = useState<Selection>({
    welcome: null,
    mainShow: null,
    interaction: null,
    closing: null,
  });

  const handleSelect = (section: keyof Selection, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [section]: prev[section] === optionId ? null : optionId,
    }));
  };

  const getSelectedOption = (section: keyof Selection) => {
    const selectedId = selections[section];
    if (!selectedId) return null;
    return sections[section].options.find((opt) => opt.id === selectedId);
  };

  const getTotalPrice = () => {
    let total = 0;
    (Object.keys(sections) as Array<keyof Selection>).forEach((section) => {
      const selected = getSelectedOption(section);
      if (selected) {
        const price = parseInt(selected.price.replace(/[$,]/g, ""));
        total += price;
      }
    });
    return total;
  };

  const getSelectionCount = () => {
    return Object.values(selections).filter((s) => s !== null).length;
  };

  const resetSelections = () => {
    setSelections({
      welcome: null,
      mainShow: null,
      interaction: null,
      closing: null,
    });
  };

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BUILD YOUR EVENT
          </h2>
          <p className="text-white/60 text-lg">
            Select experiences for each part of your event
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Sections */}
          <div className="lg:col-span-2 space-y-8">
            {(Object.keys(sections) as Array<keyof Selection>).map(
              (sectionKey) => {
                const section = sections[sectionKey];
                return (
                  <div
                    key={sectionKey}
                    className="bg-primary-charcoal rounded-2xl border border-white/10 p-8"
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-white/60">{section.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(sectionKey, option.id)}
                          className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                            selections[sectionKey] === option.id
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white border-white/20 hover:border-white/50"
                          }`}
                          style={{
                            boxShadow:
                              selections[sectionKey] === option.id
                                ? "0 0 30px rgba(255, 255, 255, 0.15)"
                                : "none",
                          }}
                        >
                          <h4 className="font-bold text-lg mb-2">
                            {option.label}
                          </h4>
                          <p
                            className={`text-xl font-bold ${
                              selections[sectionKey] === option.id
                                ? "text-black"
                                : "text-white"
                            }`}
                          >
                            {option.price}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* Right Column - Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-primary-charcoal rounded-2xl border border-white/10 p-8 sticky top-8">
              <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">
                Your Event Summary
              </h3>

              {getSelectionCount() === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-white/60">
                    Start building your event by selecting experiences
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected Items */}
                  <div className="space-y-4 mb-8">
                    {(Object.keys(sections) as Array<keyof Selection>).map(
                      (sectionKey) => {
                        const selected = getSelectedOption(sectionKey);
                        return (
                          <div
                            key={sectionKey}
                            className="pb-4 border-b border-white/10 last:border-0"
                          >
                            <div className="text-white/60 text-xs uppercase tracking-widest mb-1">
                              {sections[sectionKey].title}
                            </div>
                            {selected ? (
                              <div className="flex justify-between items-start">
                                <span className="text-white font-bold">
                                  {selected.label}
                                </span>
                                <span className="text-white/80 text-sm">
                                  {selected.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-white/40 text-sm">
                                Not selected
                              </span>
                            )}
                          </div>
                        );
                      }
                    )}
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

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-white/60 text-xs uppercase tracking-widest">
                        Sections Filled
                      </span>
                      <span className="text-white text-xs font-bold">
                        {getSelectionCount()}/4
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-500"
                        style={{
                          width: `${(getSelectionCount() / 4) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      disabled={getSelectionCount() === 0}
                      className={`w-full px-6 py-4 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${
                        getSelectionCount() > 0
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-white/20 text-white/40 cursor-not-allowed"
                      }`}
                      style={{
                        boxShadow:
                          getSelectionCount() > 0
                            ? "0 0 30px rgba(255, 255, 255, 0.15)"
                            : "none",
                      }}
                    >
                      Get Recommendations
                    </button>

                    {getSelectionCount() > 0 && (
                      <button
                        onClick={resetSelections}
                        className="w-full px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide text-sm"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/60 text-xs leading-relaxed">
                      Based on your selections, we&apos;ll recommend specific artists
                      and experiences that match your vision and budget.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation Results */}
        {getSelectionCount() === 4 && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm uppercase tracking-widest mb-4">
                Complete Package
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                RECOMMENDED ARTISTS
              </h3>
              <p className="text-white/60">
                Here are the artists and companies we recommend for your event
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "LightWorks Studio", specialty: "Light Installations" },
                { name: "Nova Performers", specialty: "Live Shows" },
                { name: "Interactive Art Co", specialty: "Tech Experiences" },
              ].map((artist, index) => (
                <div
                  key={index}
                  className="bg-primary-charcoal rounded-2xl border border-white/10 p-8 hover:border-white/30 transition-all duration-300"
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
                  <div className="aspect-square bg-white/5 rounded-lg mb-4" />
                  <h4 className="text-white font-bold text-xl mb-2">
                    {artist.name}
                  </h4>
                  <p className="text-white/60 mb-4">{artist.specialty}</p>
                  <button className="w-full px-4 py-2 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-wide text-sm">
                    View Portfolio
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
