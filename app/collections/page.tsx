import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function CollectionsPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="heading-1 mb-4">Collections</h1>
        <p className="body-large mb-8" style={{ color: 'var(--color-secondary-text)' }}>
          Curated collections of experiences coming soon in Phase 2.
        </p>
        <p className="body-text mb-8" style={{ color: 'var(--color-secondary-text)' }}>
          For now, you can explore all available experiences.
        </p>
        <Button href="/experiences" size="lg">
          Explore All Experiences
        </Button>
      </div>
    </div>
  );
}
