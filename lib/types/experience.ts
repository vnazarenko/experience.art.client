export interface ExperiencePhoto {
  id: number;
  url: string;
  thumbnail_url?: string;
  filename: string;
}

export interface ExperienceListItem {
  id: number;
  name: string;
  slug: string;
  current_location_zip?: string;
  base_cost_per_mile?: number;
  daily_rate?: number;
  hourly_rate?: number;
  reservation_fee: number;
  setup_fee?: number;
  artist_name: string;
  primary_photo_url: string;
}

export interface Experience {
  id: number;
  name: string;
  slug: string;
  description?: string;
  current_location_zip?: string;
  hourly_rate?: number;
  daily_rate?: number;
  weekly_discount_percent?: number;
  monthly_discount_percent?: number;
  setup_fee?: number;
  reservation_fee: number;
  base_cost_per_mile?: number;
  hi_demand_multiplier?: number;
  elevation_multiplier?: number;
  artist_name: string;
  artist_id?: number;
  photos: ExperiencePhoto[];
}

export interface PriceCalculation {
  total_cents: number;
  breakdown: {
    base_cost: number;
    travel_cost: number;
    setup_cost: number;
    high_demand_cost?: number;
  };
  formatted_total: string;
}

export interface PriceCalculationParams {
  destination_zip: string;
  from_date: string;
  from_time: string;
  till_date: string;
  till_time: string;
}
