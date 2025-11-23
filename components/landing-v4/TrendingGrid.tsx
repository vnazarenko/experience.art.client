import { SectionContainer } from "../landing-shared/SectionContainer";
import Link from "next/link";

const badges = ['HOT', null, 'STAFF PICK', null, 'TRENDING', 'STAFF PICK'];

interface TrendingGridProps {
  experiences: any[];
}

export function TrendingGrid({ experiences }: TrendingGridProps) {
  return (
    <SectionContainer background="light" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-14">
        TRENDING NOW
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience, index) => (
          <Link href={`/experiences/${experience.slug}`} key={experience.id}>
            <div className="bg-white rounded-xl overflow-hidden border-2 border-[#f5f5f5] transition-all duration-300 hover:border-[#1a1a1a] hover:-translate-y-1 hover:shadow-lg cursor-pointer">
              <div className="relative aspect-square">
                {experience.photos?.[0] ? (
                  <img
                    src={experience.photos[0].url}
                    alt={experience.title}
                    className="w-full h-full object-cover saturate-[1.1]"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image</span>
                  </div>
                )}

                {badges[index] && (
                  <div className="absolute top-3 right-3 bg-[#1a1a1a] text-white px-3.5 py-1.5 rounded-2xl text-xs font-medium uppercase tracking-wide">
                    {badges[index]}
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-[17px] text-[#1a1a1a] mb-2 line-clamp-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] mb-3">
                  {experience.artist?.name || 'Artist'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
