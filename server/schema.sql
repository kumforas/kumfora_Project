-- Kumfora Database Schema for Supabase
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ─── Feedback ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback (created_at DESC);

-- ─── Contact Submissions ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  order_number TEXT,
  topic TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions (created_at DESC);

-- ─── Newsletter Subscribers ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email);

-- ─── Orders ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_order_id ON orders (order_id);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- ─── Validation Constraints ──────────────────────────────────────────────────

ALTER TABLE contact_submissions
  ADD CONSTRAINT chk_contact_topic
  CHECK (topic IN ('order','product','shipping','returns','period','wholesale','other'));

ALTER TABLE orders
  ADD CONSTRAINT chk_order_payment
  CHECK (payment_method IN ('cod','card'));

ALTER TABLE orders
  ADD CONSTRAINT chk_order_totals
  CHECK (subtotal >= 0 AND shipping >= 0 AND total >= 0);

ALTER TABLE orders
  ADD CONSTRAINT chk_order_pincode
  CHECK (pincode ~ '^\d{6}$');

-- ─── Row Level Security (RLS) ───────────────────────────────────────────────
-- Enable RLS on all tables (API routes use service_role key, so RLS won't block them)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anon key to INSERT (for client-side forms if needed later)
CREATE POLICY "Allow anonymous inserts on feedback"
  ON feedback FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on contact_submissions"
  ON contact_submissions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on orders"
  ON orders FOR INSERT TO anon WITH CHECK (true);

-- Service role bypasses RLS, so no extra policies needed for server-side operations
