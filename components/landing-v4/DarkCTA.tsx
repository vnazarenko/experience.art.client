import Link from "next/link";
import { SectionContainer } from "../landing-shared/SectionContainer";

export function DarkCTA() {
  return (
    <SectionContainer background="dark" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
          CREATE AN EXPERIENCE
        </h2>

        <p className="text-lg text-white/80 mb-12">
          Browse our full collection of artists and installations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/experiences">
            <button className="bg-white text-[#1a1a1a] px-12 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-200">
              Browse Experiences
            </button>
          </Link>

          <Link href="/collections">
            <button className="bg-transparent border-2 border-white text-white px-12 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200">
              View Collections
            </button>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
