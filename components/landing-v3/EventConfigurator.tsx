"use client";

import { SectionContainer } from "../landing-shared/SectionContainer";

const configuratorOptions = {
  eventType: ['Birthday Party', 'Corporate', 'Wedding', 'Festival'],
  vibe: ['WOW Factor', 'Futuristic', 'Art Installation', 'Epic / File Show'],
  budget: ['Under $1,000', '$1,000–$5,000', '$5,000–$20,000', '$20,000+']
};

export function EventConfigurator() {
  return (
    <SectionContainer background="black" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-14">
        WHAT'S YOUR EVENT?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Type of Event */}
        <div
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/30"
          style={{
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
            transition: 'all 300ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0)';
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
            Type of Event
          </h3>
          <ul className="space-y-3">
            {configuratorOptions.eventType.map((option) => (
              <li
                key={option}
                className="text-white/80 py-3 border-b border-white/5 cursor-pointer transition-all hover:text-white hover:translate-x-1"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        {/* Vibe */}
        <div
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/30"
          style={{
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
            transition: 'all 300ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0)';
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
            Vibe
          </h3>
          <ul className="space-y-3">
            {configuratorOptions.vibe.map((option) => (
              <li
                key={option}
                className="text-white/80 py-3 border-b border-white/5 cursor-pointer transition-all hover:text-white hover:translate-x-1"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        {/* Budget */}
        <div
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/30"
          style={{
            boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
            transition: 'all 300ms'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0)';
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">
            Budget
          </h3>
          <ul className="space-y-3">
            {configuratorOptions.budget.map((option) => (
              <li
                key={option}
                className="text-white/80 py-3 border-b border-white/5 cursor-pointer transition-all hover:text-white hover:translate-x-1"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
