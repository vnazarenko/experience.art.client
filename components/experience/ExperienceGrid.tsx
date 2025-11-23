import { ExperienceListItem } from '@/lib/types/experience';
import { ExperienceCard } from './ExperienceCard';

interface ExperienceGridProps {
  experiences: ExperienceListItem[];
}

export function ExperienceGrid({ experiences }: ExperienceGridProps) {
  if (experiences.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="body-text" style={{ color: 'var(--color-secondary-text)' }}>
          No experiences found. Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
