import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 z-10" />
        <img
          src="/landing-photos/Orb.png"
          alt="Immersive Experience"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl">
        <h1
          className="text-6xl md:text-7xl lg:text-[72px] font-bold text-white mb-6 tracking-tight"
          style={{
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)'
          }}
        >
          FIND YOUR NEXT EXPERIENCE
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
          Immersive art, performances, and installations for unforgettable events.
        </p>

        <Link href="/experiences">
          <button
            className="bg-white text-black px-12 py-4 rounded-lg font-medium text-base uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              letterSpacing: '0.05em',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
            }}
          >
            DISCOVER EXPERIENCES
          </button>
        </Link>
      </div>
    </section>
  );
}
