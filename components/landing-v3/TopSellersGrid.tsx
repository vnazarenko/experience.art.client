"use client";

import { SectionContainer } from "../landing-shared/SectionContainer";
import Link from "next/link";

const badges = ['Most Requested', 'Trending Now', 'Premium', null, 'Trending Now', null];

interface TopSellersGridProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiences: any[];
}

export function TopSellersGrid({ experiences }: TopSellersGridProps) {
  return (
    <SectionContainer background="dark" className="py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        TOP SELLERS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((experience, index) => (
          <Link href={`/experiences/${experience.slug}`} key={experience.id}>
            <div
              className="bg-primary-charcoal rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              style={{
                boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
                transition: 'all 300ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.6)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
                e.currentTarget.style.border = '1px solid transparent';
              }}
            >
              {/* Image */}
              <div className="relative aspect-square">
                {experience.photos?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={experience.photos[0].url}
                    alt={experience.title}
                    className="w-full h-full object-cover saturate-[0.8] brightness-[0.9]"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">No image</span>
                  </div>
                )}

                {/* Badge */}
                {badges[index] && (
                  <div
                    className="absolute top-4 right-4 bg-white/95 text-black px-3 py-1.5 rounded-full text-xs font-medium uppercase"
                    style={{ backdropFilter: 'blur(10px)' }}
                  >
                    {badges[index]}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                  {experience.title}
                </h3>
                <p className="text-sm text-white/60">
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
