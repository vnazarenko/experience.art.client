import { SectionContainer } from "../landing-shared/SectionContainer";

const collections = [
  { title: 'IMMERSIVE SCULPTURES', image: '/landing-photos/Badillac.png' },
  { title: 'CORPORATE WOW', image: '/landing-photos/Heathen.png' },
  { title: 'OUTDOOR SHOWS', image: '/landing-photos/Lady Buggies.png' }
];

export function CollectionGrid() {
  return (
    <SectionContainer background="black" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        CURATED COLLECTIONS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] group-hover:brightness-[0.8] group-hover:contrast-[1.2] transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Title */}
            <div className="absolute bottom-6 left-6 z-10">
              <h3
                className="text-xl font-semibold text-white"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
              >
                {collection.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
