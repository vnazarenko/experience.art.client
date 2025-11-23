import Link from 'next/link';
import Image from 'next/image';
import { ExperienceListItem } from '@/lib/types/experience';

interface ExperienceCardProps {
  experience: ExperienceListItem;
  onClick?: () => void;
}

export function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const hourlyRate = experience.hourly_rate || (experience.daily_rate ? experience.daily_rate / 24 : null);

  return (
    <Link
      href={`/experiences/${experience.slug}`}
      onClick={onClick}
      className="card group block"
    >
      {/* Image */}
      <div className="relative aspect-experience overflow-hidden" style={{ background: 'var(--color-secondary-muted)' }}>
        <Image
          src={experience.primary_photo_url}
          alt={experience.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="heading-5 mb-2 line-clamp-2 group-hover:text-[var(--color-accent-coral)] transition-colors">
          {experience.name}
        </h3>

        <p className="body-small mb-4">
          {experience.artist_name}
        </p>

        {hourlyRate && (
          <div className="flex items-baseline gap-1">
            <span className="text-[0.875rem] font-medium" style={{ color: 'var(--color-primary-black)' }}>
              from ${Math.round(hourlyRate)}
            </span>
            <span className="caption">/hour</span>
          </div>
        )}
      </div>
    </Link>
  );
}
