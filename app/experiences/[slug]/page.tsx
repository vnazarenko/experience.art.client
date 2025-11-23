import { notFound } from 'next/navigation';
import { api } from '@/lib/api/client';
import { PhotoGallery } from '@/components/experience/PhotoGallery';
import { PriceCalculator } from '@/components/experience/PriceCalculator';

interface ExperienceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { slug } = await params;

  let experience;
  try {
    experience = await api.experiences.getBySlug(slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Photos */}
        <div>
          <PhotoGallery photos={experience.photos} />
        </div>

        {/* Right Column: Details and Price Calculator */}
        <div className="space-y-8">
          {/* Experience Info */}
          <div>
            <h1 className="heading-1 mb-2">{experience.name}</h1>
            <p className="body-large" style={{ color: 'var(--color-secondary-text)' }}>
              by {experience.artist_name}
            </p>
          </div>

          {/* Description */}
          {experience.description && (
            <div>
              <h2 className="heading-4 mb-3">About This Experience</h2>
              <p className="body-text" style={{ whiteSpace: 'pre-wrap' }}>
                {experience.description}
              </p>
            </div>
          )}

          {/* Base Pricing Info */}
          <div className="p-4 bg-[var(--color-primary-warm-gray)] rounded-lg">
            <h3 className="heading-5 mb-3">Base Pricing</h3>
            <div className="space-y-2">
              {experience.daily_rate && (
                <div className="flex justify-between body-text">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Daily Rate</span>
                  <span>${experience.daily_rate}</span>
                </div>
              )}
              {experience.hourly_rate && (
                <div className="flex justify-between body-text">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Hourly Rate</span>
                  <span>${experience.hourly_rate}</span>
                </div>
              )}
              {experience.setup_fee && (
                <div className="flex justify-between body-text">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Setup Fee</span>
                  <span>${experience.setup_fee}</span>
                </div>
              )}
              {experience.reservation_fee && (
                <div className="flex justify-between body-text">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Reservation Fee</span>
                  <span>${experience.reservation_fee}</span>
                </div>
              )}
            </div>
            <p className="body-small mt-3" style={{ color: 'var(--color-secondary-text)' }}>
              Travel costs calculated based on your location
            </p>
          </div>

          {/* Price Calculator */}
          <PriceCalculator experienceId={experience.id} experienceSlug={experience.slug} />
        </div>
      </div>
    </div>
  );
}
