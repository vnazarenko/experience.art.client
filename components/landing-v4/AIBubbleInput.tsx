import { SectionContainer } from "../landing-shared/SectionContainer";

export function AIBubbleInput() {
  return (
    <SectionContainer background="gray" className="py-20 md:py-32">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">✨</div>
          <p className="text-sm font-medium uppercase tracking-widest text-[#6b6b6b]">
            ASK OUR AI CURATOR
          </p>
        </div>

        <div className="bg-white border-2 border-[#e5e5e5] rounded-3xl p-8 md:p-10 shadow-lg transition-all duration-300 hover:border-[#1a1a1a] hover:shadow-xl">
          <input
            type="text"
            placeholder="Describe your celebration, event, or idea — we'll match it with the perfect artistic experience."
            className="w-full bg-transparent border-none text-lg text-[#1a1a1a] placeholder:text-[#cccccc] focus:outline-none py-2"
          />
        </div>

        <p className="text-sm text-[#6b6b6b] text-center mt-5">
          AI-powered recommendations
        </p>
      </div>
    </SectionContainer>
  );
}
