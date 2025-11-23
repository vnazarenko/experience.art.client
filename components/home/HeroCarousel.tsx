'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExperienceListItem } from '@/lib/types/experience';

interface HeroCarouselProps {
  experiences: ExperienceListItem[];
}

export function HeroCarousel({ experiences }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (isPaused || experiences.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, experiences.length]);

  if (experiences.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-[var(--color-primary-warm-gray)] flex items-center justify-center">
        <p className="body-text" style={{ color: 'var(--color-secondary-text)' }}>
          No featured experiences available
        </p>
      </div>
    );
  }

  const currentExperience = experiences[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  return (
    <div
      className="relative h-[500px] md:h-[600px] overflow-hidden bg-[var(--color-primary-black)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {experience.primary_photo_url ? (
              // Use regular img tag for Active Storage URLs to avoid Next.js proxy issues
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={experience.primary_photo_url}
                alt={experience.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/placeholder-experience.svg"
                alt={experience.name}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="container pb-12 md:pb-16">
          <div className="max-w-2xl">
            <h2 className="heading-2 mb-3 animate-fade-in" style={{ color: '#ffffff' }}>
              {currentExperience.name}
            </h2>
            <p className="body-large mb-4" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              by {currentExperience.artist_name}
            </p>
            <a
              href={`/experiences/${currentExperience.slug}`}
              className="btn btn-primary inline-block"
            >
              View Experience
            </a>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {experiences.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            aria-label="Previous experience"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
            aria-label="Next experience"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {experiences.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {experiences.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
