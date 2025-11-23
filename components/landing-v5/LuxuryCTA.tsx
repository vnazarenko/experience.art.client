import Link from "next/link";
import { SectionContainer } from "../landing-shared/SectionContainer";

export function LuxuryCTA() {
  return (
    <SectionContainer background="dark" className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-normal text-white mb-6"
          style={{
            letterSpacing: '-0.01em',
            fontWeight: 400
          }}
        >
          Begin Your Journey
        </h2>

        <p className="text-base text-white/70 leading-relaxed mb-12">
          Explore our collection of curated experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/experiences">
            <button
              className="bg-white text-[#1a1a1a] px-10 py-3.5 rounded-sm font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
              style={{ letterSpacing: '0.05em' }}
            >
              View All Experiences
            </button>
          </Link>

          <Link href="/contact">
            <button
              className="bg-transparent border border-white/30 text-white px-10 py-3.5 rounded-sm font-medium text-sm uppercase tracking-wider hover:border-white hover:bg-white/5 transition-all"
              style={{ letterSpacing: '0.05em' }}
            >
              Contact Curator
            </button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
