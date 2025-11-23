"use client";

import Link from "next/link";
import { SectionContainer } from "../landing-shared/SectionContainer";

export function FinalCTA() {
  return (
    <SectionContainer background="black" className="py-20 md:py-32 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6">
          START YOUR EXPERIENCE
        </h2>

        <p className="text-lg text-white/70 mb-12">
          Browse artists and experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/experiences">
            <button
              className="bg-white text-black px-12 py-4 rounded-xl font-medium uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
              }}
            >
              Start Your Experience
            </button>
          </Link>

          <Link href="/collections">
            <button
              className="bg-transparent border-2 border-white/30 text-white px-12 py-4 rounded-xl font-medium uppercase tracking-wider transition-all duration-300 hover:border-white"
              style={{
                transition: 'all 300ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 255, 255, 0)';
              }}
            >
              Browse All Artists
            </button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
