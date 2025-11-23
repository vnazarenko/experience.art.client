import Link from "next/link";

export function CinematicHero() {
  return (
    <section className="relative bg-white pt-32 pb-20">
      <div className="container max-w-6xl">
        {/* Hero Image */}
        <div className="mb-20">
          <div className="relative aspect-[16/9] max-h-[600px]">
            <img
              src="/landing-photos/Lady Buggies.png"
              alt="Curated art experience"
              className="w-full h-full object-cover saturate-[0.85] brightness-[1.02]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-[#1a1a1a] mb-6"
            style={{
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              fontWeight: 400
            }}
          >
            Curated Experiences for Exceptional Events
          </h1>

          <p className="text-lg md:text-xl text-[#6b6b6b] leading-relaxed max-w-lg mx-auto mb-12">
            Premium installations, performances, and immersive art
          </p>

          <Link href="/experiences">
            <button
              className="bg-[#1a1a1a] text-white px-10 py-3.5 rounded-sm font-medium text-sm uppercase tracking-wider transition-opacity duration-250 hover:opacity-85"
              style={{ letterSpacing: '0.02em' }}
            >
              Browse The Collection
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
