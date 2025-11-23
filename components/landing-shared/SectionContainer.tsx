interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'dark' | 'light' | 'gray' | 'black';
}

export function SectionContainer({
  children,
  className = '',
  background = 'light'
}: SectionContainerProps) {
  const bgClass = {
    dark: 'bg-[#1a1a1a]',
    black: 'bg-[#000000]',
    light: 'bg-white',
    gray: 'bg-[#fafaf9]'
  }[background];

  return (
    <section className={`${bgClass} ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}
