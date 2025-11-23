import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column: Photo Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-[4/3] rounded-lg" />
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded" />
            ))}
          </div>
        </div>

        {/* Right Column: Details Skeleton */}
        <div className="space-y-8">
          <div>
            <Skeleton className="h-12 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/3" />
          </div>

          <div>
            <Skeleton className="h-6 w-1/4 mb-3" />
            <Skeleton className="h-24 w-full" />
          </div>

          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
