import { SectionContainer } from "../landing-shared/SectionContainer";

const selectorOptions = {
  eventType: ['Corporate', 'Private', 'Luxury Wedding', 'Brand Activation'],
  atmosphere: ['Elegant', 'Immersive', 'Avant-Garde', 'Technological', 'Performance-Focused'],
  scale: ['Intimate', 'Medium Scale', 'Large Production', 'No Limit']
};

export function MinimalSelector() {
  return (
    <SectionContainer background="gray" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#cccccc] text-center mb-4">
          DISCOVER
        </p>

        <h2
          className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-16"
          style={{ letterSpacing: '-0.01em' }}
        >
          What Are You Planning?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event Type */}
          <div className="bg-white border border-[#e5e5e5] rounded-sm p-8 md:p-10 transition-all duration-300 hover:border-[#1a1a1a] hover:shadow-lg cursor-pointer">
            <p className="text-sm font-normal text-[#cccccc] mb-6">01</p>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-5">Event Type</h3>
            <ul className="space-y-2.5">
              {selectorOptions.eventType.map((option) => (
                <li
                  key={option}
                  className="text-[15px] text-[#6b6b6b] py-2.5 border-b border-[#f5f5f5] transition-all hover:text-[#1a1a1a] cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>

          {/* Atmosphere */}
          <div className="bg-white border border-[#e5e5e5] rounded-sm p-8 md:p-10 transition-all duration-300 hover:border-[#1a1a1a] hover:shadow-lg cursor-pointer">
            <p className="text-sm font-normal text-[#cccccc] mb-6">02</p>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-5">Atmosphere</h3>
            <ul className="space-y-2.5">
              {selectorOptions.atmosphere.map((option) => (
                <li
                  key={option}
                  className="text-[15px] text-[#6b6b6b] py-2.5 border-b border-[#f5f5f5] transition-all hover:text-[#1a1a1a] cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>

          {/* Scale */}
          <div className="bg-white border border-[#e5e5e5] rounded-sm p-8 md:p-10 transition-all duration-300 hover:border-[#1a1a1a] hover:shadow-lg cursor-pointer">
            <p className="text-sm font-normal text-[#cccccc] mb-6">03</p>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-5">Scale</h3>
            <ul className="space-y-2.5">
              {selectorOptions.scale.map((option) => (
                <li
                  key={option}
                  className="text-[15px] text-[#6b6b6b] py-2.5 border-b border-[#f5f5f5] transition-all hover:text-[#1a1a1a] cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
