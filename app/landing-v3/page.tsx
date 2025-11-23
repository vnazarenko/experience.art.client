import { Hero } from "@/components/landing-v3/Hero";
import { EventConfigurator } from "@/components/landing-v3/EventConfigurator";
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
      <CollectionGrid />
      <TopSellersGrid experiences={topExperiences} />
      <AIFinder />
      <FinalCTA />
    </div>
  );
}
