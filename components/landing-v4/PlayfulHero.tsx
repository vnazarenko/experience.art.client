import Link from "next/link";

export function PlayfulHero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-[#fafaf9] to-white flex items-center justify-center overflow-hidden">
      {/* Scattered decorative images */}
      <div className="absolute inset-0 z-0 hidden md:block">
        {/* Top left */}
        <div className="absolute top-20 left-12 w-32 h-32 rounded-xl shadow-lg rotate-[-3deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Eiro.jpg" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Top right */}
        <div className="absolute top-32 right-16 w-40 h-40 rounded-2xl shadow-lg rotate-[2deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Kalliope.png" alt="" className="w-full h-full object-cover rounded-xl" />
        </div>

        {/* Bottom left */}
        <div className="absolute bottom-32 left-20 w-36 h-36 rounded-lg shadow-lg rotate-[3deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Bonsai Baum.png" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Bottom right */}
        <div className="absolute bottom-20 right-12 w-28 h-28 rounded-xl shadow-lg rotate-[-2deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Star Flu.png" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Center left */}
        <div className="absolute top-1/2 left-40 w-24 h-24 rounded-lg shadow-lg rotate-[1deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Orb.png" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>

        {/* Center right */}
        <div className="absolute top-1/3 right-32 w-32 h-32 rounded-xl shadow-lg rotate-[-2deg]" style={{ border: '3px solid white' }}>
          <img src="/landing-photos/Badillac.png" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 py-20 md:py-32 max-w-4xl">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1a1a] mb-6"
          style={{ letterSpacing: '-0.01em', lineHeight: 1.1 }}
        >
          EXPLORE EXTRAORDINARY EXPERIENCES
        </h1>

        <p className="text-lg md:text-xl text-[#6b6b6b] max-w-2xl mx-auto mb-10">
          From performers to installations — discover art that transforms any event.
        </p>

        <Link href="/experiences">
          <button className="bg-[#1a1a1a] text-white px-12 py-4 rounded-xl font-medium text-base shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            Start Exploring
          </button>
        </Link>
      </div>
    </section>
  );
}
