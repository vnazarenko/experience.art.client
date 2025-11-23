export interface LockParams {
  experience_id: number;
  start_at: string; // ISO8601
  ends_at: string; // ISO8601
  amount_cents: number;
  customer_name: string;
  contact_email: string;
  contact_phone: string;
  customer_address: string;
}

export interface LockResponse {
  client_token: string;
  expires_at: string;
  payment_intent_id?: string;
}

export interface CheckoutSessionResponse {
  url: string;
}
