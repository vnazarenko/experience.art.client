import { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded-sm h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const styles = {
    ...style,
    width: width || style?.width,
    height: height || (variant === 'text' ? '1rem' : style?.height),
  };

  return (
    <div
      className={`animate-pulse bg-[var(--color-secondary-muted)] ${variantClasses[variant]} ${className}`}
      style={styles}
      {...props}
    />
  );
}
