import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ScatteredPhotoHero } from "@/components/landing/ScatteredPhotoHero";

export const metadata = {
  title: "Experience Art - Immersive Art Marketplace",
  description: "Welcome to a marketplace of radical, immersive, and experiential art forms.",
};

export default function LandingV2() {
  return (
    <div className="relative min-h-screen">
      {/* Scattered Photo Hero with Center Content */}
      <ScatteredPhotoHero />

      {/* How It Works Section */}
      <section className="bg-[var(--color-primary-black)] text-white py-24 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white text-[var(--color-primary-black)] flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Discover</h3>
              <p className="text-gray-300 leading-relaxed">
                Browse our curated collection of immersive art experiences from talented artists around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white text-[var(--color-primary-black)] flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Book</h3>
              <p className="text-gray-300 leading-relaxed">
                Calculate pricing for your location and dates, then secure your booking with a simple reservation.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white text-[var(--color-primary-black)] flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Enjoy a unique, professionally delivered art experience at your chosen location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container text-center">
          <h2 className="heading-2 mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="body-large text-[var(--color-secondary-text)] mb-10 max-w-2xl mx-auto">
            Join curators, event planners, and art enthusiasts who are bringing immersive experiences to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/experiences">
              <Button size="lg">Browse All Experiences</Button>
            </Link>
            <Link href="/collections">
              <Button variant="outline" size="lg">View Collections</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
