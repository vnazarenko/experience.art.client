'use client';

import { useState } from 'react';
import { ExperiencePhoto } from '@/lib/types/experience';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: ExperiencePhoto[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-[4/3] bg-[var(--color-primary-warm-gray)] rounded-lg flex items-center justify-center">
        <p className="body-text" style={{ color: 'var(--color-secondary-text)' }}>
          No photos available
        </p>
      </div>
    );
  }

  const selectedPhoto = photos[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/3] bg-[var(--color-primary-warm-gray)] rounded-lg overflow-hidden">
        <Image
          src={selectedPhoto.url}
          alt={selectedPhoto.filename || `Photo ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={selectedIndex === 0}
        />
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded overflow-hidden transition-all ${
                index === selectedIndex
                  ? 'ring-2 ring-[var(--color-accent-coral)]'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={photo.thumbnail_url || photo.url}
                alt={photo.filename || `Photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Photo Counter */}
      <p className="body-small text-center" style={{ color: 'var(--color-secondary-text)' }}>
        {selectedIndex + 1} / {photos.length}
      </p>
    </div>
  );
}
