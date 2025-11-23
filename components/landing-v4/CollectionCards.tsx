import { SectionContainer } from "../landing-shared/SectionContainer";

const collections = [
  { title: 'Color Explosion Performances', count: 12, image: '/landing-photos/Heathen.png' },
  { title: 'Street-Art Inspired Installations', count: 8, image: '/landing-photos/Badillac.png' },
  { title: 'Electronic & Neon Experiences', count: 15, image: '/landing-photos/Orb.png' },
  { title: 'Dreamy Wedding Art Moments', count: 10, image: '/landing-photos/Kalliope.png' }
];

export function CollectionCards() {
  return (
    <SectionContainer background="gray" className="py-16 md:py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
          EDITOR'S PICKS
        </h2>
        <p className="text-lg text-[#6b6b6b]">
          Curated collections for every vibe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
          >
            <div className="relative aspect-[4/3]">
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover saturate-[1.2] contrast-[1.05]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Title badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md">
                <h3 className="font-semibold text-sm md:text-base text-[#1a1a1a]">
                  {collection.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-[#6b6b6b]">
                {collection.count} experiences
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
