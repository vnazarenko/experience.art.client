'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface PhotoPosition {
  src: string;
  alt: string;
  // Desktop position
  desktop: {
    top: string;
    left: string;
    width: string;
    rotation: number;
  };
  // Mobile position (optional - if not provided, uses desktop)
  mobile?: {
    top: string;
    left: string;
    width: string;
    rotation: number;
  };
  // Tablet position (optional)
  tablet?: {
    top: string;
    left: string;
    width: string;
    rotation: number;
  };
  // Z-index for layering
  zIndex: number;
  // Animation delay
  delay: number;
}

export function ScatteredPhotoHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Strategic positioning of photos across the viewport
  // Designed to create visual interest while keeping center clear for text
  const photoPositions: PhotoPosition[] = [
    // Top left area
    {
      src: '/landing-photos/Eiro.jpg',
      alt: 'Art installation',
      desktop: { top: '5%', left: '3%', width: '20%', rotation: -8 },
      tablet: { top: '8%', left: '2%', width: '24%', rotation: -6 },
      mobile: { top: '10%', left: '-5%', width: '35%', rotation: -10 },
      zIndex: 3,
      delay: 0.1,
    },
    // Top right area
    {
      src: '/landing-photos/Heathen.png',
      alt: 'Art installation',
      desktop: { top: '8%', left: '75%', width: '22%', rotation: 6 },
      tablet: { top: '12%', left: '72%', width: '26%', rotation: 8 },
      mobile: { top: '5%', left: '68%', width: '38%', rotation: 12 },
      zIndex: 2,
      delay: 0.2,
    },
    // Middle left
    {
      src: '/landing-photos/Kalliope.png',
      alt: 'Art installation',
      desktop: { top: '35%', left: '5%', width: '18%', rotation: 4 },
      tablet: { top: '38%', left: '3%', width: '22%', rotation: 5 },
      mobile: { top: '35%', left: '-8%', width: '32%', rotation: 6 },
      zIndex: 4,
      delay: 0.3,
    },
    // Middle right
    {
      src: '/landing-photos/Badillac.png',
      alt: 'Art installation',
      desktop: { top: '30%', left: '78%', width: '19%', rotation: -5 },
      tablet: { top: '35%', left: '75%', width: '23%', rotation: -6 },
      mobile: { top: '40%', left: '72%', width: '35%', rotation: -8 },
      zIndex: 3,
      delay: 0.4,
    },
    // Bottom left
    {
      src: '/landing-photos/Bonsai Baum.png',
      alt: 'Art installation',
      desktop: { top: '65%', left: '2%', width: '23%', rotation: -4 },
      tablet: { top: '68%', left: '1%', width: '27%', rotation: -5 },
      mobile: { top: '72%', left: '-6%', width: '38%', rotation: -7 },
      zIndex: 2,
      delay: 0.5,
    },
    // Bottom right
    {
      src: '/landing-photos/Lady Buggies.png',
      alt: 'Art installation',
      desktop: { top: '68%', left: '73%', width: '24%', rotation: 7 },
      tablet: { top: '70%', left: '70%', width: '28%', rotation: 8 },
      mobile: { top: '78%', left: '65%', width: '40%', rotation: 10 },
      zIndex: 4,
      delay: 0.6,
    },
    // Bottom center (moved down and right)
    {
      src: '/landing-photos/Orb.png',
      alt: 'Art installation',
      desktop: { top: '72%', left: '42%', width: '16%', rotation: -3 },
      tablet: { top: '75%', left: '40%', width: '18%', rotation: -4 },
      mobile: { top: '80%', left: '35%', width: '28%', rotation: -5 },
      zIndex: 1,
      delay: 0.7,
    },
    // Top center (smaller accent)
    {
      src: '/landing-photos/Star Flu.png',
      alt: 'Art installation',
      desktop: { top: '5%', left: '42%', width: '15%', rotation: 5 },
      tablet: { top: '6%', left: '41%', width: '18%', rotation: 6 },
      mobile: { top: '8%', left: '38%', width: '25%', rotation: 7 },
      zIndex: 1,
      delay: 0.8,
    },
  ];

  // Get the appropriate position based on screen size
  const getPosition = (photo: PhotoPosition) => {
    if (isMobile && photo.mobile) {
      return photo.mobile;
    }
    if (isTablet && photo.tablet) {
      return photo.tablet;
    }
    return photo.desktop;
  };

  return (
    <section className="relative min-h-screen bg-[var(--color-primary-black)] overflow-hidden flex items-center justify-center">
      {/* Scattered Photos Background */}
      <div className="absolute inset-0">
        {photoPositions.map((photo, index) => {
          const position = getPosition(photo);
          return (
            <div
              key={index}
              className="absolute transition-all duration-1000 ease-out"
              style={{
                top: position.top,
                left: position.left,
                width: position.width,
                transform: `rotate(${position.rotation}deg) ${
                  isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)'
                }`,
                zIndex: photo.zIndex,
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${photo.delay}s`,
              }}
            >
              <div
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.15)] transition-all duration-500 cursor-pointer group"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/40 pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 container text-center px-6 py-20">
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transitionDelay: '0.3s',
          }}
        >
          {/* Logo */}
          <div className="mb-12">
            <img
              src="https://cdn.prod.website-files.com/66964928eb5804f71f1456c1/66964928eb5804f71f145722_Experience%20Art%20Logo.png"
              alt="Experience Art Logo"
              className="h-16 md:h-20 mx-auto"
              style={{ filter: 'invert(1) brightness(2)' }}
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-white mb-8 tracking-tight leading-tight" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            EXPERIENCE ART
          </h1>

          {/* Welcome Message */}
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
            WELCOME TO A MARKETPLACE OF RADICAL, IMMERSIVE, AND EXPERIENTIAL ART FORMS.
          </p>

          {/* CTA Button */}
          <Link href="/experiences">
            <button className="group relative inline-flex items-center justify-center px-12 py-5 text-lg font-semibold text-white border-2 border-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              {/* Button background animation */}
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Button text */}
              <span className="relative z-10 group-hover:text-[var(--color-primary-black)] transition-colors duration-500">
                ENTER THE SITE
              </span>

              {/* Arrow icon */}
              <svg
                className="relative z-10 ml-3 w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-[var(--color-primary-black)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>

          {/* Secondary CTA */}
          <div className="mt-8">
            <Link
              href="/collections"
              className="text-white/80 hover:text-white text-sm md:text-base font-medium transition-colors duration-300 underline underline-offset-4 decoration-white/40 hover:decoration-white"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: '1s',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
