import { Hero } from "@/components/landing-v3/Hero";
import { EventConfigurator } from "@/components/landing-v3/EventConfigurator";
import { WizardFlow } from "@/components/landing-v3/WizardFlow";
import { MoodboardPicker } from "@/components/landing-v3/MoodboardPicker";
import { AIAutoFilter } from "@/components/landing-v3/AIAutoFilter";
import { ExperienceQuiz } from "@/components/landing-v3/ExperienceQuiz";
import { DynamicSmartFilters } from "@/components/landing-v3/DynamicSmartFilters";
import { BuildYourEvent } from "@/components/landing-v3/BuildYourEvent";
import { CollectionGrid } from "@/components/landing-v3/CollectionGrid";
import { TopSellersGrid } from "@/components/landing-v3/TopSellersGrid";
import { AIFinder } from "@/components/landing-v3/AIFinder";
import { FinalCTA } from "@/components/landing-v3/FinalCTA";
import { api } from "@/lib/api/client";

export const metadata = {
  title: "Find Your Next Experience - Experience.art",
  description: "Immersive art, performances, and installations for unforgettable events.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function LandingV3() {
  // Fetch experiences
  let experiences = [];
  try {
    experiences = await api.experiences.list();
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
  }

  // Get top 6 experiences for Top Sellers
  const topExperiences = experiences.slice(0, 6);

  return (
    <div className="relative min-h-screen bg-black">
      <Hero />
      <EventConfigurator />
      <hr className="w-full text-white"/>
      <WizardFlow />
      <hr className="w-full text-white"/>
      <MoodboardPicker />
      <hr className="w-full text-white"/>
      <AIAutoFilter />
      <hr className="w-full text-white"/>
      <ExperienceQuiz />
      <hr className="w-full text-white"/>
      <DynamicSmartFilters />
      <hr className="w-full text-white"/>
      <BuildYourEvent />
      <hr className="w-full text-white"/>
      <CollectionGrid />
      <TopSellersGrid experiences={topExperiences} />
      <AIFinder />
      <FinalCTA />
    </div>
  );
}
