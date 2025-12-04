"use client";

import { useState } from "react";
import { SectionContainer } from "../landing-shared/SectionContainer";

type Tag = {
  id: string;
  label: string;
  category: string;
};

type Experience = {
  name: string;
  url: string;
  main_photo_url: string;
  match_count: number;
  matched_tags: {
    visual: string[];
    atmosphere: string[];
    color: string[];
  };
  is_full_match: boolean;
};

type ExperienceSearchResponse = {
  experiences: Experience[];
  metadata: {
    total_results: number;
    search_tags: {
      visual: string[];
      atmosphere: string[];
      color: string[];
    };
  };
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


export function MoodboardPicker() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showExperiences, setShowExperiences] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Custom input states for each category
  const [customVisualStyle, setCustomVisualStyle] = useState("");
  const [customAtmosphere, setCustomAtmosphere] = useState("");
  const [customColorVibe, setCustomColorVibe] = useState("");

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
    setCustomVisualStyle("");
    setCustomAtmosphere("");
    setCustomColorVibe("");
    setShowExperiences(false);
    setExperiences([]);
  };

  const handleShowExperiences = async () => {
    // Build tags object grouped by category
    const allTags = [...visualStyles, ...atmospheres, ...colorVibes];
    const tags: { visual: string[]; atmosphere: string[]; color: string[] } = {
      visual: [],
      atmosphere: [],
      color: [],
    };

    selectedTags.forEach((tagId) => {
      const tag = allTags.find((t) => t.id === tagId);
      if (tag) {
        if (tag.category === "visual") {
          tags.visual.push(tag.id);
        } else if (tag.category === "atmosphere") {
          tags.atmosphere.push(tag.id);
        } else if (tag.category === "color") {
          tags.color.push(tag.id);
        }
      }
    });

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/experience_searches/by_tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });

      const data: ExperienceSearchResponse = await response.json();
      console.log("Experience search response:", data);
      setExperiences(data.experiences);
      setShowExperiences(true);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has any selection (tags or custom inputs)
  const hasAnySelection = selectedTags.length > 0 ||
    customVisualStyle.trim() !== "" ||
    customAtmosphere.trim() !== "" ||
    customColorVibe.trim() !== "";

  const getTagLabel = (tagId: string): string => {
    const allTags = [...visualStyles, ...atmospheres, ...colorVibes];
    return allTags.find((t) => t.id === tagId)?.label || tagId;
  };


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

        {/* Selected Tags - Always visible */}
        <div className="bg-primary-charcoal rounded-xl border border-white/10 p-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs">
              Your Selection {selectedTags.length > 0 && `(${selectedTags.length})`}
            </h3>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAll}
                className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 min-h-8">
            {selectedTags.length > 0 ? (
              selectedTags.map((tagId) => (
                <button
                  key={tagId}
                  onClick={() => removeTag(tagId)}
                  className="px-3 py-1 rounded-full bg-white text-black font-bold text-xs flex items-center gap-1.5 hover:bg-white/90 transition-all duration-300"
                >
                  {getTagLabel(tagId)}
                  <span className="text-sm leading-none">×</span>
                </button>
              ))
            ) : (
              <span className="text-white/30 text-sm">Select tags below to build your moodboard...</span>
            )}
          </div>
        </div>

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
                className={`w-24 h-11 md:w-28 md:h-11 rounded-xl border transition-all duration-300 font-bold uppercase tracking-wide text-xs flex items-center justify-center text-center p-2 ${
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
          {/* Custom input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Or describe your visual style..."
              value={customVisualStyle}
              onChange={(e) => setCustomVisualStyle(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300 text-sm"
            />
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
                className={`w-24 h-11 md:w-28 md:h-11 rounded-xl border transition-all duration-300 font-bold uppercase tracking-wide text-xs flex items-center justify-center text-center p-2 ${
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
          {/* Custom input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Or describe your atmosphere..."
              value={customAtmosphere}
              onChange={(e) => setCustomAtmosphere(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300 text-sm"
            />
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
                className={`w-24 h-11 md:w-28 md:h-11 rounded-xl border transition-all duration-300 font-bold uppercase tracking-wide text-xs flex items-center justify-center text-center p-2 ${
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
          {/* Custom input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Or describe your color vibe..."
              value={customColorVibe}
              onChange={(e) => setCustomColorVibe(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/40 px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 focus:border-white outline-none transition-all duration-300 text-sm"
            />
          </div>
        </div>

        {/* Show Experiences Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowExperiences}
            disabled={!hasAnySelection || isLoading}
            className={`px-12 py-4 rounded-full font-bold uppercase tracking-widest text-lg transition-all duration-300 ${
              hasAnySelection && !isLoading
                ? "bg-white text-black hover:bg-white/90"
                : "bg-white/20 text-white/40 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Loading..." : "Show Experiences"}
          </button>
        </div>

        {/* Results Preview - Only shown after clicking button */}
        {showExperiences && (
          <div className="mt-16">
            <h3 className="text-white text-2xl font-bold uppercase tracking-widest mb-8 text-center">
              Matched Experiences ({experiences.length})
            </h3>
            {experiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((exp) => (
                  <a
                    key={exp.url}
                    href={exp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-charcoal rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all duration-300 group block"
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
                    <div className="aspect-square bg-white/5 rounded-lg mb-4 overflow-hidden">
                      {exp.main_photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={exp.main_photo_url}
                          alt={exp.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <h4 className="text-white font-bold mb-2">{exp.name}</h4>
                    <p className="text-white/60 text-sm mb-2">
                      {exp.match_count} tags match
                      {exp.is_full_match && (
                        <span className="ml-2 text-green-400">Full match</span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {[...exp.matched_tags.visual, ...exp.matched_tags.atmosphere, ...exp.matched_tags.color].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center">No experiences found matching your selection.</p>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
