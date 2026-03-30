---
title: "Photographer Tiers & Seeker Discounts"
description: "Database schema additions to support Founder/Pioneer photographer tiers and Seeker welcome discount tracking."
type: "tech"
epic: "platform"
status: "approved"
related_issues: ["39"]
related_specs: ["biz-model.md", "tech-db.md"]
---

# Tech Spec: Photographer Tiers & Seeker Discounts

## 1. Context & Objective

Implement the database columns required to support the KAPT monetization model:

- **Photographer Tiers:** Founder (0% fee) and Pioneer (8% fee) statuses with time and
  revenue-based eligibility limits.
- **Seeker Discounts:** One-time welcome discount guard and identity validation timestamp.

---

## 2. Migration: `000003_tiers_and_discounts.sql`

File: `services/sqlc/migration/000003_tiers_and_discounts.sql`

### Photographer columns

| Column | Type | Default | Purpose |
| --- | --- | --- | --- |
| `is_founder` | `BOOLEAN` | `FALSE` | Eligibility for 0% platform fee |
| `is_pioneer` | `BOOLEAN` | `FALSE` | Eligibility for 8% reduced fee |
| `founder_deadline` | `TIMESTAMPTZ` | `NULL` | 6-month window cutoff for Founder status |
| `total_revenue_accumulated` | `NUMERIC(10,2)` | `0.00` | Accumulated revenue; Founder status revoked at R$ 5,000 |
| `commission_rate` | `NUMERIC(5,4)` | `0.1500` | Effective commission rate (overrides default 15%) |

### Seeker columns

| Column | Type | Default | Purpose |
| --- | --- | --- | --- |
| `welcome_discount_used` | `BOOLEAN` | `FALSE` | Prevents multiple uses of the 20% welcome discount |
| `last_facial_scan_at` | `TIMESTAMPTZ` | `NULL` | Timestamp of most recent identity validation |

---

## 3. SQLC Queries

### `GetPhotographerTier` — `:one`

Fetches tier status and commission rate for payout calculation.

```sql
SELECT id, is_founder, is_pioneer, founder_deadline,
       total_revenue_accumulated, commission_rate
FROM photographers
WHERE id = $1;
```

### `UpdatePhotographerRevenue` — `:one`

Accumulates revenue after each sale and returns updated row.

```sql
UPDATE photographers
SET total_revenue_accumulated = total_revenue_accumulated + $2,
    updated_at = NOW()
WHERE id = $1
RETURNING id, is_founder, is_pioneer, total_revenue_accumulated, commission_rate;
```

---

## 4. Business Rules

- **Founder:** `is_founder = TRUE` AND `NOW() < founder_deadline` AND
  `total_revenue_accumulated < 5000.00` → `commission_rate = 0.0000`
- **Pioneer:** `is_pioneer = TRUE` AND NOT Founder-eligible → `commission_rate = 0.0800`
- **Default:** `commission_rate = 0.1500`
- `commission_rate` is the authoritative field used at payout time — business logic
  (not the DB) is responsible for setting it correctly when tier status changes.
- `welcome_discount_used` is a one-time flag — once `TRUE`, the 20% discount cannot
  be reapplied regardless of account state.

---

## 5. Files Changed

| File | Action |
| --- | --- |
| `services/sqlc/migration/000003_tiers_and_discounts.sql` | New migration |
| `services/sqlc/query/photographers.sql` | New SQLC queries |
| `services/internal/repository/models.go` | Updated (sqlc generate) |
| `services/internal/repository/photographers.sql.go` | New (sqlc generate) |
| `services/internal/repository/querier.go` | Updated (sqlc generate) |

---

## 6. Success Criteria

- Migration applies cleanly against the existing schema.
- `sqlc generate` completes without errors.
- `Photographer` model in Go includes all 5 new fields.
- `Seeker` model in Go includes both new fields.
- `go build ./...` passes.
