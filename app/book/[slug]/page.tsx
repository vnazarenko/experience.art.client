'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { ExperienceDetail, PriceCalculation } from '@/lib/types/experience';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = params.slug as string;
  const zipCode = searchParams.get('zip') || '';
  const startDate = searchParams.get('start') || '';
  const endDate = searchParams.get('end') || '';

  const [experience, setExperience] = useState<ExperienceDetail | null>(null);
  const [calculation, setCalculation] = useState<PriceCalculation | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!zipCode || !startDate || !endDate) {
        setError('Missing booking parameters. Please use the price calculator first.');
        setLoading(false);
        return;
      }

      try {
        const [exp, calc] = await Promise.all([
          api.experiences.getBySlug(slug),
          api.experiences.calculate(slug, {
            zip_code: zipCode,
            start_date: startDate,
            end_date: endDate,
          }),
        ]);

        setExperience(exp);
        setCalculation(calc);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, zipCode, startDate, endDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experience || !calculation) return;

    setSubmitting(true);
    setError(null);

    try {
      // Create a lock (reservation)
      const lockResponse = await api.locks.create({
        experience_id: experience.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        state,
        zip_code: zipCode,
        start_date: startDate,
        end_date: endDate,
        total: calculation.total,
      });

      // Get the checkout session
      const checkoutSession = await api.locks.checkoutSession(lockResponse.client_token);

      // Redirect to Stripe checkout
      if (checkoutSession.checkout_url) {
        window.location.href = checkoutSession.checkout_url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reservation');
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !experience || !calculation) {
    return (
      <div className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-2 mb-4">Unable to Load Booking</h1>
          <p className="body-text mb-6" style={{ color: 'var(--color-secondary-text)' }}>
            {error || 'Something went wrong. Please try again.'}
          </p>
          <Button href={`/experiences/${slug}`}>Back to Experience</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-1 mb-2">Complete Your Booking</h1>
        <p className="body-large mb-8" style={{ color: 'var(--color-secondary-text)' }}>
          {experience.name} by {experience.artist_name}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="heading-3 mb-6">Your Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <Input
                  label="Street Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <Input
                    label="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    maxLength={2}
                    placeholder="CA"
                  />
                  <Input
                    label="ZIP Code"
                    type="text"
                    value={zipCode}
                    readOnly
                    disabled
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="body-text text-red-700">{error}</p>
                  </div>
                )}

                <Button type="submit" size="lg" fullWidth loading={submitting}>
                  Proceed to Payment
                </Button>

                <p className="body-small text-center" style={{ color: 'var(--color-secondary-text)' }}>
                  You will be redirected to Stripe to complete your payment securely
                </p>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="heading-4 mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="body-small font-medium">Dates</p>
                  <p className="body-text">
                    {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="body-small font-medium">Location</p>
                  <p className="body-text">{zipCode}</p>
                </div>
              </div>

              <div className="border-t border-[var(--color-secondary-border)] pt-4 space-y-2">
                <div className="flex justify-between body-small">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Daily Rate × {calculation.number_of_days}</span>
                  <span>{formatCurrency(calculation.daily_rate * calculation.number_of_days)}</span>
                </div>

                <div className="flex justify-between body-small">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Setup Fee</span>
                  <span>{formatCurrency(calculation.setup_fee)}</span>
                </div>

                <div className="flex justify-between body-small">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Travel ({calculation.distance_miles} mi)</span>
                  <span>{formatCurrency(calculation.travel_cost)}</span>
                </div>

                <div className="flex justify-between body-small">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Subtotal</span>
                  <span>{formatCurrency(calculation.subtotal)}</span>
                </div>

                <div className="flex justify-between body-small">
                  <span style={{ color: 'var(--color-secondary-text)' }}>Reservation Fee</span>
                  <span>{formatCurrency(calculation.reservation_fee)}</span>
                </div>

                <div className="border-t-2 border-[var(--color-primary-black)] pt-2 mt-2">
                  <div className="flex justify-between heading-4">
                    <span>Total</span>
                    <span style={{ color: 'var(--color-accent-coral)' }}>
                      {formatCurrency(calculation.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-[var(--color-primary-warm-gray)] rounded-lg">
                <p className="body-small" style={{ color: 'var(--color-secondary-text)' }}>
                  A reservation fee of {formatCurrency(calculation.reservation_fee)} secures your booking.
                  The remaining balance is due before the experience.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
