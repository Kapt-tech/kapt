package repository

import (
	"context"
)

const listPhotographers = `
SELECT id, name, email, bio, stripe_account_id, created_at, updated_at,
       is_founder, is_pioneer, founder_deadline, total_revenue_accumulated, commission_rate
FROM photographers
ORDER BY created_at DESC
`

func (q *Queries) ListPhotographers(ctx context.Context) ([]Photographer, error) {
	rows, err := q.db.QueryContext(ctx, listPhotographers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []Photographer
	for rows.Next() {
		var i Photographer
		if err := rows.Scan(
			&i.ID, &i.Name, &i.Email, &i.Bio, &i.StripeAccountID,
			&i.CreatedAt, &i.UpdatedAt,
			&i.IsFounder, &i.IsPioneer, &i.FounderDeadline,
			&i.TotalRevenueAccumulated, &i.CommissionRate,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	return items, rows.Err()
}
