'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-primary-white)] border-b border-[var(--color-secondary-border)] safe-top">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="heading-4 hover:text-[var(--color-accent-coral)] transition-colors">
            Experience<span style={{ color: 'var(--color-accent-coral)' }}>.art</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/experiences"
              className="body-text hover:text-[var(--color-accent-coral)] transition-colors"
            >
              Experiences
            </Link>
            <Link
              href="/collections"
              className="body-text hover:text-[var(--color-accent-coral)] transition-colors"
            >
              Collections
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden btn-ghost p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 animate-slide-up">
            <Link
              href="/experiences"
              className="block body-text hover:text-[var(--color-accent-coral)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experiences
            </Link>
            <Link
              href="/collections"
              className="block body-text hover:text-[var(--color-accent-coral)] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
