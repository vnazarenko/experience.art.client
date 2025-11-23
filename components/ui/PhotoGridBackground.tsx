'use client';

export function PhotoGridBackground() {
  const photos = [
    '/landing-photos/Badillac.png',
    '/landing-photos/Bonsai Baum.png',
    '/landing-photos/Eiro.jpg',
    '/landing-photos/Heathen.png',
    '/landing-photos/Kalliope.png',
    '/landing-photos/Lady Buggies.png',
    '/landing-photos/Orb.png',
    '/landing-photos/Star Flu.png',
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 opacity-[0.08] grayscale">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />
    </div>
  );
}
