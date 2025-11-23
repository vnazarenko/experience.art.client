import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ExperienceGrid } from "@/components/experience/ExperienceGrid";
import { api } from "@/lib/api/client";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch all experiences for carousel and featured section
  let experiences = [];
  try {
    experiences = await api.experiences.list();
  } catch (error) {
    console.error('Failed to fetch experiences:', error);
  }

  // Use first 5 for carousel
  const carouselExperiences = experiences.slice(0, 5);

  // Use random 4 for featured
  const featuredExperiences = experiences
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Carousel */}
      {carouselExperiences.length > 0 && (
        <HeroCarousel experiences={carouselExperiences} />
      )}

      {/* Intro Section */}
      <section className="bg-[var(--color-primary-warm-gray)]">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Experience
              <span style={{ color: 'var(--color-accent-coral)' }}> art</span>
            </h1>
            <p className="body-large mb-8" style={{ color: 'var(--color-secondary-text)' }}>
              Welcome to a marketplace of radical, immersive, and experiential art forms.
              Discover unique performances and installations brought to your location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/experiences">
                <Button size="lg">Explore All Experiences</Button>
              </Link>
              <Link href="/collections">
                <Button variant="outline" size="lg">Browse Collections</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      {featuredExperiences.length > 0 && (
        <section className="container py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="heading-2">Featured Experiences</h2>
            <Link href="/experiences" className="body-text hover:text-[var(--color-accent-coral)] transition-colors">
              View All →
            </Link>
          </div>
          <ExperienceGrid experiences={featuredExperiences} />
        </section>
      )}

      {/* How It Works Section */}
      <section className="bg-[var(--color-primary-warm-gray)] py-16 md:py-24">
        <div className="container">
          <h2 className="heading-2 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-coral)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="heading-4 mb-2">Discover</h3>
              <p className="body-small">
                Browse our curated collection of immersive art experiences from talented artists.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-coral)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="heading-4 mb-2">Book</h3>
              <p className="body-small">
                Calculate pricing for your location and dates, then secure your booking with a reservation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-coral)] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="heading-4 mb-2">Experience</h3>
              <p className="body-small">
                Enjoy a unique, professionally delivered art experience at your chosen location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-primary-black)] text-white">
        <div className="container py-16 md:py-24 text-center">
          <h2 className="heading-2 mb-4" style={{ color: 'white' }}>
            Ready to explore?
          </h2>
          <p className="body-large mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Start browsing our collection of immersive art experiences
          </p>
          <Link href="/experiences">
            <Button size="lg">View All Experiences</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
