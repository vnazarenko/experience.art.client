"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type Tag = {
  id: string;
  label: string;
  category: string;
};

const visualStyles: Tag[] = [
  { id: "neon", label: "Neon", category: "visual" },
  { id: "cyber", label: "Cyber", category: "visual" },
  { id: "gold", label: "Gold Luxury", category: "visual" },
  { id: "minimal", label: "Minimal", category: "visual" },
  { id: "organic", label: "Organic", category: "visual" },
  { id: "retro", label: "Retro", category: "visual" },
  { id: "funfair", label: "Funfair", category: "visual" },
];

const atmospheres: Tag[] = [
  { id: "energy", label: "High Energy", category: "atmosphere" },
  { id: "calm", label: "Calm", category: "atmosphere" },
  { id: "experimental", label: "Experimental", category: "atmosphere" },
  { id: "mystical", label: "Mystical", category: "atmosphere" },
  { id: "playful", label: "Playful", category: "atmosphere" },
];

const colorVibes: Tag[] = [
  { id: "warm", label: "Warm", category: "color" },
  { id: "cold", label: "Cold", category: "color" },
  { id: "multicolor", label: "Multicolor", category: "color" },
  { id: "dark", label: "Dark", category: "color" },
  { id: "pastel", label: "Pastel", category: "color" },
];

const mockExperiences = [
  { id: 1, name: "Neon Dreams Installation", matches: 3 },
  { id: 2, name: "Cyberpunk DJ Experience", matches: 2 },
  { id: 3, name: "Holographic Dance Floor", matches: 3 },
  { id: 4, name: "LED Art Sculpture", matches: 2 },
];

export function MoodboardPicker() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const removeTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  const clearAll = () => {
    setSelectedTags([]);
  };

  const getTagLabel = (tagId: string): string => {
    const allTags = [...visualStyles, ...atmospheres, ...colorVibes];
    return allTags.find((t) => t.id === tagId)?.label || tagId;
  };

  const matchCount = selectedTags.length > 0 ? mockExperiences.length : 0;

  return (
    <SectionContainer background="black" className="py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BUILD YOUR MOODBOARD
          </h2>
          <p className="text-white/60 text-lg">
            Select tags that match your vision
          </p>
        </div>

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm">
                Your Selection ({selectedTags.length})
              </h3>
              <button
                onClick={clearAll}
                className="text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-300"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedTags.map((tagId) => (
                <button
                  key={tagId}
                  onClick={() => removeTag(tagId)}
                  className="px-4 py-2 rounded-full bg-white text-black font-bold text-sm flex items-center gap-2 hover:bg-white/90 transition-all duration-300"
                >
                  {getTagLabel(tagId)}
                  <span className="text-lg leading-none">×</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Style Section */}
        <div className="mb-10">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-4">
            Visual Style
          </h3>
          <div className="flex flex-wrap gap-3">
            {visualStyles.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-bold uppercase tracking-wide text-sm ${
                  selectedTags.includes(tag.id)
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/30 hover:border-white"
                }`}
                style={{
                  boxShadow: selectedTags.includes(tag.id)
                    ? "0 0 30px rgba(255, 255, 255, 0.15)"
                    : "none",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Atmosphere Section */}
        <div className="mb-10">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-4">
            Atmosphere
          </h3>
          <div className="flex flex-wrap gap-3">
            {atmospheres.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-bold uppercase tracking-wide text-sm ${
                  selectedTags.includes(tag.id)
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/30 hover:border-white"
                }`}
                style={{
                  boxShadow: selectedTags.includes(tag.id)
                    ? "0 0 30px rgba(255, 255, 255, 0.15)"
                    : "none",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color Vibes Section */}
        <div className="mb-10">
          <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-4">
            Color Vibes
          </h3>
          <div className="flex flex-wrap gap-3">
            {colorVibes.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 font-bold uppercase tracking-wide text-sm ${
                  selectedTags.includes(tag.id)
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white border-white/30 hover:border-white"
                }`}
                style={{
                  boxShadow: selectedTags.includes(tag.id)
                    ? "0 0 30px rgba(255, 255, 255, 0.15)"
                    : "none",
                }}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Show Experiences Button */}
        <div className="flex justify-center mt-12">
          <button
            disabled={selectedTags.length === 0}
            className={`px-12 py-4 rounded-full font-bold uppercase tracking-widest text-lg transition-all duration-300 ${
              selectedTags.length > 0
                ? "bg-white text-black hover:bg-white/90"
                : "bg-white/20 text-white/40 cursor-not-allowed"
            }`}
          >
            Show Experiences {matchCount > 0 && `(${matchCount})`}
          </button>
        </div>

        {/* Results Preview */}
        {selectedTags.length > 0 && (
          <div className="mt-16">
            <h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-8 text-center">
              Matched Experiences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300 group"
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
                  <h4 className="text-white font-bold mb-2">{exp.name}</h4>
                  <p className="text-white/60 text-sm">
                    {exp.matches} tags match
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
