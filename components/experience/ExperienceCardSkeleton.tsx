import { Skeleton } from '@/components/ui/Skeleton';

export function ExperienceCardSkeleton() {
  return (
    <div className="card">
      <Skeleton className="w-full aspect-experience" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
