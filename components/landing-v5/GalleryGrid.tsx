import { SectionContainer } from "../landing-shared/SectionContainer";
import Link from "next/link";

interface GalleryGridProps {
  experiences: any[];
}

export function GalleryGrid({ experiences }: GalleryGridProps) {
  return (
    <SectionContainer background="gray" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#cccccc] text-center mb-4">
          COLLECTION
        </p>

        <h2
          className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-20"
          style={{ letterSpacing: '-0.01em' }}
        >
          All Experiences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {experiences.map((experience) => (
            <Link href={`/experiences/${experience.slug}`} key={experience.id}>
              <div className="bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                <div className="mb-6">
                  <div className="relative aspect-[4/3]">
                    {experience.photos?.[0] ? (
                      <img
                        src={experience.photos[0].url}
                        alt={experience.title}
                        className="w-full h-full object-cover saturate-[0.85]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p
                    className="text-sm text-[#cccccc] mb-2"
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {experience.artist?.name || 'Artist'}
                  </p>

                  <h3 className="text-xl font-semibold text-[#1a1a1a] leading-snug mb-3 line-clamp-2">
                    {experience.title}
                  </h3>

                  <p className="text-[15px] text-[#6b6b6b] leading-relaxed line-clamp-2 mb-4">
                    {experience.description || 'Immersive experience'}
                  </p>

                  <span className="text-lg text-[#1a1a1a]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
