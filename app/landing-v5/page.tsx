import { CinematicHero } from "@/components/landing-v5/CinematicHero";
import { MinimalSelector } from "@/components/landing-v5/MinimalSelector";
import { EditorialHighlights } from "@/components/landing-v5/EditorialHighlights";
import { GalleryGrid } from "@/components/landing-v5/GalleryGrid";
import { CuratorInput } from "@/components/landing-v5/CuratorInput";
import { LuxuryCTA } from "@/components/landing-v5/LuxuryCTA";
import { api } from "@/lib/api/client";

export const metadata = {
  title: "Curated Experiences for Exceptional Events - Experience.art",
  description: "Premium installations, performances, and immersive art.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function LandingV5() {
  // Fetch experiences
  let experiences = [];
  try {
    experiences = await api.experiences.list();
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
  }

  // Get experiences for gallery grid (6 items)
  const galleryExperiences = experiences.slice(0, 6);

  return (
    <div className="relative min-h-screen bg-white">
      <CinematicHero />
      <MinimalSelector />
      <EditorialHighlights />
      <GalleryGrid experiences={galleryExperiences} />
      <CuratorInput />
      <LuxuryCTA />
    </div>
  );
}
