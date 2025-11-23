import { PlayfulHero } from "@/components/landing-v4/PlayfulHero";
import { StickerSelector } from "@/components/landing-v4/StickerSelector";
import { CollectionCards } from "@/components/landing-v4/CollectionCards";
import { TrendingGrid } from "@/components/landing-v4/TrendingGrid";
import { AIBubbleInput } from "@/components/landing-v4/AIBubbleInput";
import { DarkCTA } from "@/components/landing-v4/DarkCTA";
import { api } from "@/lib/api/client";

export const metadata = {
  title: "Explore Extraordinary Experiences - Experience.art",
  description: "From performers to installations — discover art that transforms any event.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function LandingV4() {
  // Fetch experiences
  let experiences = [];
  try {
    experiences = await api.experiences.list();
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
  }

  // Get experiences for trending grid (6 items)
  const trendingExperiences = experiences.slice(0, 6);

  return (
    <div className="relative min-h-screen">
      <PlayfulHero />
      <StickerSelector />
      <CollectionCards />
      <TrendingGrid experiences={trendingExperiences} />
      <AIBubbleInput />
      <DarkCTA />
    </div>
  );
}
