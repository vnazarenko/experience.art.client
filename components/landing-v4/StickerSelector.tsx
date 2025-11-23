import { SectionContainer } from "../landing-shared/SectionContainer";

const selectorData = {
  eventTypes: ['Birthday', 'Corporate', 'Wedding', 'Festival', 'Private Party', 'Brand Activation'],
  moods: ['Colorful', 'Immersive', 'Futuristic', 'Fire Show', 'LED/Light', 'Elegant', 'Wild'],
  budget: ['Under $1K', '$1K-$5K', '$5K-$20K', '$20K+']
};

export function StickerSelector() {
  return (
    <SectionContainer background="light" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-14">
        FIND YOUR PERFECT EXPERIENCE
      </h2>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Event Types */}
        <div>
          <label className="block text-sm font-medium uppercase tracking-wider text-[#6b6b6b] mb-4">
            Event Type
          </label>
          <div className="flex flex-wrap gap-3">
            {selectorData.eventTypes.map((tag) => (
              <button
                key={tag}
                className="px-5 py-3 bg-[#f5f5f5] border-2 border-transparent rounded-full font-medium text-[#1a1a1a] shadow-sm transition-all duration-200 hover:bg-white hover:border-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Moods */}
        <div>
          <label className="block text-sm font-medium uppercase tracking-wider text-[#6b6b6b] mb-4">
            Mood
          </label>
          <div className="flex flex-wrap gap-3">
            {selectorData.moods.map((tag) => (
              <button
                key={tag}
                className="px-5 py-3 bg-[#f5f5f5] border-2 border-transparent rounded-full font-medium text-[#1a1a1a] shadow-sm transition-all duration-200 hover:bg-white hover:border-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium uppercase tracking-wider text-[#6b6b6b] mb-4">
            Budget
          </label>
          <div className="flex flex-wrap gap-3">
            {selectorData.budget.map((tag) => (
              <button
                key={tag}
                className="px-5 py-3 bg-[#f5f5f5] border-2 border-transparent rounded-full font-medium text-[#1a1a1a] shadow-sm transition-all duration-200 hover:bg-white hover:border-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-md"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-[#6b6b6b] mt-12">
          Showing recommended experiences...
        </p>
      </div>
    </SectionContainer>
  );
}
