'use client';

import { useState } from 'react';
import { api } from '@/lib/api/client';
import { PriceCalculation } from '@/lib/types/experience';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PriceCalculatorProps {
  experienceId: number;
  experienceSlug: string;
}

export function PriceCalculator({ experienceId, experienceSlug }: PriceCalculatorProps) {
  const [zipCode, setZipCode] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [calculation, setCalculation] = useState<PriceCalculation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await api.experiences.calculate(experienceId, {
        zip_code: zipCode,
        start_date: startDate,
        end_date: endDate,
      });
      setCalculation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate price');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <h3 className="heading-4 mb-4">Calculate Your Price</h3>

      <form onSubmit={handleCalculate} className="space-y-4">
        <Input
          label="Your ZIP Code"
          type="text"
          placeholder="90210"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          required
          pattern="[0-9]{5}"
          helperText="5-digit US ZIP code"
        />

        <Input
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <Input
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          min={startDate}
        />

        <Button type="submit" fullWidth loading={loading}>
          Calculate Price
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="body-small text-red-700">{error}</p>
          </div>
        )}
      </form>

      {calculation && (
        <div className="mt-6 pt-6 border-t border-[var(--color-secondary-border)]">
          <h4 className="heading-5 mb-4">Price Breakdown</h4>

          <div className="space-y-2">
            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Daily Rate</span>
              <span>{formatCurrency(calculation.daily_rate)}</span>
            </div>

            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Number of Days</span>
              <span>{calculation.number_of_days}</span>
            </div>

            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Setup Fee</span>
              <span>{formatCurrency(calculation.setup_fee)}</span>
            </div>

            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Travel Distance</span>
              <span>{calculation.distance_miles} miles</span>
            </div>

            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Travel Cost</span>
              <span>{formatCurrency(calculation.travel_cost)}</span>
            </div>

            <div className="flex justify-between body-text pt-2 border-t border-[var(--color-secondary-border)]">
              <span style={{ color: 'var(--color-secondary-text)' }}>Subtotal</span>
              <span>{formatCurrency(calculation.subtotal)}</span>
            </div>

            <div className="flex justify-between body-text">
              <span style={{ color: 'var(--color-secondary-text)' }}>Reservation Fee</span>
              <span>{formatCurrency(calculation.reservation_fee)}</span>
            </div>

            <div className="flex justify-between heading-4 pt-2 border-t-2 border-[var(--color-primary-black)]">
              <span>Total</span>
              <span style={{ color: 'var(--color-accent-coral)' }}>
                {formatCurrency(calculation.total)}
              </span>
            </div>
          </div>

          <Button
            href={`/book/${experienceSlug}?zip=${zipCode}&start=${startDate}&end=${endDate}`}
            size="lg"
            fullWidth
            className="mt-6"
          >
            Book This Experience
          </Button>
        </div>
      )}
    </Card>
  );
}
