import { SectionContainer } from "../landing-shared/SectionContainer";

export function CuratorInput() {
  return (
    <SectionContainer background="light" className="py-20 md:py-32">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#cccccc] text-center mb-4">
          PERSONAL CURATOR
        </p>

        <h2
          className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-6"
          style={{ letterSpacing: '-0.01em' }}
        >
          Let Us Guide You
        </h2>

        <p className="text-base text-[#6b6b6b] text-center leading-relaxed mb-12 max-w-xl mx-auto">
          Describe your vision, and we'll curate the perfect artistic experience
        </p>

        <div className="bg-[#fafaf9] border border-[#e5e5e5] rounded-sm p-12">
          <textarea
            placeholder="Describe your event..."
            className="w-full bg-white border border-[#e5e5e5] rounded-sm p-6 text-base text-[#1a1a1a] placeholder:text-[#cccccc] focus:outline-none focus:border-[#1a1a1a] min-h-[120px] resize-none transition-all"
            style={{ boxShadow: 'none' }}
          />

          <button
            className="mt-5 bg-[#1a1a1a] text-white px-10 py-3.5 rounded-sm font-medium text-sm uppercase tracking-wider hover:opacity-85 transition-opacity"
            style={{ letterSpacing: '0.05em' }}
          >
            Submit Inquiry
          </button>
        </div>
      </div>
    </SectionContainer>
  );
}
