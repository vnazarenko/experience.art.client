// Use different API URLs for server-side (Docker) vs client-side (browser)
function getApiBase(): string {
  // Check if we're running on the server (Node.js) or client (browser)
  if (typeof window === 'undefined') {
    // Server-side: use Docker internal hostname
    return process.env.NEXT_PUBLIC_API_URL || 'http://host.docker.internal:3001';
  } else {
    // Client-side (browser): use localhost
    return process.env.NEXT_PUBLIC_BROWSER_API_URL || 'http://localhost:3001';
  }
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: response.statusText };
      }

      throw new ApiError(
        response.status,
        errorData.error || `API error: ${response.statusText}`,
        errorData
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error instanceof Error ? error.message : 'Network error');
  }
}

export const api = {
  experiences: {
    list: (params?: { q?: string }) => {
      const queryParams = new URLSearchParams();
      if (params?.q) queryParams.append('q', params.q);

      const query = queryParams.toString();
      return fetchApi<any[]>(`/api/v1/experiences${query ? `?${query}` : ''}`);
    },

    search: (query: string) => {
      return fetchApi<any[]>(`/api/v1/experiences/search?q=${encodeURIComponent(query)}`);
    },

    getBySlug: (slug: string) => {
      return fetchApi<any>(`/experience/${slug}`);
    },

    getPhotos: (id: number | string) => {
      return fetchApi<any[]>(`/experience/${id}/photos`);
    },

    calculate: (id: number | string, params: {
      destination_zip: string;
      from_date: string;
      from_time: string;
      till_date: string;
      till_time: string;
    }) => {
      const formData = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value);
      });

      return fetchApi<any>(`/experience/${id}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });
    },

    getAvailableDates: (id: number | string, params: { from: string; to: string }) => {
      const queryParams = new URLSearchParams(params);
      return fetchApi<any>(`/experience/${id}/available_dates?${queryParams.toString()}`);
    },
  },

  locks: {
    create: (params: {
      experience_id: number;
      start_at: string;
      ends_at: string;
      amount_cents: number;
      customer_name: string;
      contact_email: string;
      contact_phone: string;
      customer_address: string;
    }) => {
      return fetchApi<{ client_token: string; expires_at: string; payment_intent_id?: string }>(
        '/api/v1/locks',
        {
          method: 'POST',
          body: JSON.stringify(params),
        }
      );
    },

    checkoutSession: (client_token: string) => {
      return fetchApi<{ url: string }>('/api/v1/locks/checkout_session', {
        method: 'POST',
        body: JSON.stringify({ client_token }),
      });
    },
  },
};
