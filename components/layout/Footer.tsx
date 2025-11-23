import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary-warm-gray)] border-t border-[var(--color-secondary-border)] safe-bottom">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="heading-5 mb-4">
              Experience<span style={{ color: 'var(--color-accent-coral)' }}>.art</span>
            </h3>
            <p className="body-small">
              A marketplace of radical, immersive, and experiential art forms.
            </p>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="heading-6 mb-4">Experiences</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/experiences" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/collections" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="heading-6 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="heading-6 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="body-small hover:text-[var(--color-accent-coral)] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-secondary-border)]">
          <p className="body-small text-center">
            © {currentYear} Experience.art. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
