interface ImagePlaceholderProps {
  aspectRatio?: string;
  alt: string;
  src?: string;
  className?: string;
  filter?: string;
}

export function ImagePlaceholder({
  aspectRatio = '4/3',
  alt,
  src,
  className = '',
  filter
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${filter || ''}`}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{alt}</span>
        </div>
      )}
    </div>
  );
}
