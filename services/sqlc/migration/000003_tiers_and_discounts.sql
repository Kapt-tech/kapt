-- migration/000003_tiers_and_discounts.sql
-- Adds Founder/Pioneer tier columns to photographers and discount tracking to seekers

-- Photographer tier columns
ALTER TABLE photographers
    ADD COLUMN IF NOT EXISTS is_founder                  BOOLEAN        NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS is_pioneer                  BOOLEAN        NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS founder_deadline            TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS total_revenue_accumulated   NUMERIC(10,2)  NOT NULL DEFAULT 0.00,
    ADD COLUMN IF NOT EXISTS commission_rate             NUMERIC(5,4)   NOT NULL DEFAULT 0.1500;

-- Seeker discount columns
ALTER TABLE seekers
    ADD COLUMN IF NOT EXISTS welcome_discount_used  BOOLEAN     NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS last_facial_scan_at    TIMESTAMPTZ;
