'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import { ExperienceListItem } from '@/lib/types/experience';
import { ExperienceGrid } from '@/components/experience/ExperienceGrid';
import { ExperienceCardSkeleton } from '@/components/experience/ExperienceCardSkeleton';
import { Input } from '@/components/ui/Input';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch experiences
  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const data = debouncedQuery
          ? await api.experiences.search(debouncedQuery)
          : await api.experiences.list();
        setExperiences(data);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [debouncedQuery]);

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="heading-1 mb-4">Explore Experiences</h1>
        <p className="body-large" style={{ color: 'var(--color-secondary-text)' }}>
          Discover immersive art experiences from talented artists across the country
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search by name, artist, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-2xl"
        />
      </div>

      {/* Results Count */}
      {!loading && (
        <div className="mb-6">
          <p className="body-small" style={{ color: 'var(--color-secondary-text)' }}>
            {experiences.length} {experiences.length === 1 ? 'experience' : 'experiences'} found
          </p>
        </div>
      )}

      {/* Experience Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ExperienceCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ExperienceGrid experiences={experiences} />
      )}
    </div>
  );
}
