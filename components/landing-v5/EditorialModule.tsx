import Link from "next/link";

interface EditorialModuleProps {
  artistName: string;
  experienceTitle: string;
  description: string;
  imagePosition?: 'left' | 'right';
  image: string;
}

export function EditorialModule({
  artistName,
  experienceTitle,
  description,
  imagePosition = 'left',
  image
}: EditorialModuleProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isImageLeft ? 'lg:grid-flow-dense' : ''}`}>
      {/* Image */}
      <div className={isImageLeft ? '' : 'lg:col-start-2'}>
        <div className="relative aspect-[3/2]">
          <img
            src={image}
            alt={experienceTitle}
            className="w-full h-full object-cover saturate-[0.9] brightness-[1.0]"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center py-10 ${isImageLeft ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
        <h3
          className="text-2xl md:text-3xl font-normal text-[#1a1a1a] mb-4"
          style={{ letterSpacing: '0.01em' }}
        >
          {artistName}
        </h3>

        <h4 className="text-xl font-semibold text-[#6b6b6b] mb-6">
          {experienceTitle}
        </h4>

        <p className="text-base text-[#6b6b6b] leading-relaxed mb-8 max-w-md" style={{ lineHeight: 1.7 }}>
          {description}
        </p>

        <Link
          href="/experiences"
          className="inline-block text-sm font-medium uppercase tracking-wider text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:opacity-60 transition-opacity w-fit"
          style={{ letterSpacing: '0.05em' }}
        >
          View Experience →
        </Link>
      </div>
    </div>
  );
}
