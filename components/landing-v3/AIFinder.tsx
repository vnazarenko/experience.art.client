import { SectionContainer } from "../landing-shared/SectionContainer";

export function AIFinder() {
  return (
    <SectionContainer background="black" className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-widest text-white/50 text-center mb-6">
          AI EXPERIENCE FINDER
        </p>

        <div
          className="bg-[#1a1a1a] border border-white/20 rounded-2xl p-8 transition-all duration-300"
          style={{
            boxShadow: '0 0 60px rgba(255, 255, 255, 0.05)'
          }}
        >
          <input
            type="text"
            placeholder="Describe your event or idea — we'll find the perfect experience."
            className="w-full bg-transparent border-none text-lg text-white placeholder:text-white/30 focus:outline-none py-4"
          />
        </div>

        <p className="text-sm text-white/40 text-center mt-4">
          Powered by AI
        </p>
      </div>
    </SectionContainer>
  );
}
