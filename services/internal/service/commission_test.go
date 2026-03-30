package service

import (
	"testing"
	"time"

	"github.com/shopspring/decimal"

	"github.com/kapt/api/internal/repository"
)

func TestPhotographerTier(t *testing.T) {
	cases := []struct {
		name         string
		photographer repository.Photographer
		wantRate     string
	}{
		{
			name:         "founder gets 0% commission",
			photographer: repository.Photographer{IsFounder: true, IsPioneer: false},
			wantRate:     "0",
		},
		{
			name:         "pioneer gets 8% commission",
			photographer: repository.Photographer{IsFounder: false, IsPioneer: true},
			wantRate:     "0.08",
		},
		{
			name:         "standard gets 15% commission",
			photographer: repository.Photographer{IsFounder: false, IsPioneer: false},
			wantRate:     "0.15",
		},
		{
			name:         "founder takes priority over pioneer",
			photographer: repository.Photographer{IsFounder: true, IsPioneer: true},
			wantRate:     "0",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := PhotographerTier(tc.photographer)
			want := decimal.RequireFromString(tc.wantRate)
			if !got.Equal(want) {
				t.Errorf("got %s, want %s", got, want)
			}
		})
	}
}

func TestApplyDiscount(t *testing.T) {
	base := decimal.NewFromInt(100)

	cases := []struct {
		name       string
		seeker     repository.Seeker
		age        time.Duration
		wantPrice  string
		wantReason string
	}{
		{
			name:       "welcome pioneer discount applies for new seeker",
			seeker:     repository.Seeker{WelcomeDiscountUsed: false},
			age:        0,
			wantPrice:  "80",
			wantReason: "Welcome Pioneer -20%",
		},
		{
			name:       "no discount for returning seeker with recent photo",
			seeker:     repository.Seeker{WelcomeDiscountUsed: true},
			age:        10 * 24 * time.Hour,
			wantPrice:  "100",
			wantReason: "",
		},
		{
			name:       "historical pack 30% for 3-6 month old photo",
			seeker:     repository.Seeker{WelcomeDiscountUsed: true},
			age:        4 * 30 * 24 * time.Hour,
			wantPrice:  "70",
			wantReason: "Historical Pack -30%",
		},
		{
			name:       "historical pack 50% for photo older than 6 months",
			seeker:     repository.Seeker{WelcomeDiscountUsed: true},
			age:        7 * 30 * 24 * time.Hour,
			wantPrice:  "50",
			wantReason: "Historical Pack -50%",
		},
		{
			name:       "welcome pioneer takes priority over historical deep",
			seeker:     repository.Seeker{WelcomeDiscountUsed: false},
			age:        8 * 30 * 24 * time.Hour,
			wantPrice:  "80",
			wantReason: "Welcome Pioneer -20%",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			gotPrice, gotReason := ApplyDiscount(base, tc.seeker, tc.age)
			wantPrice := decimal.RequireFromString(tc.wantPrice)
			if !gotPrice.Equal(wantPrice) {
				t.Errorf("price: got %s, want %s", gotPrice, wantPrice)
			}
			if gotReason != tc.wantReason {
				t.Errorf("reason: got %q, want %q", gotReason, tc.wantReason)
			}
		})
	}
}

func TestCalculate(t *testing.T) {
	base := decimal.NewFromInt(100)

	cases := []struct {
		name             string
		photographer     repository.Photographer
		seeker           repository.Seeker
		age              time.Duration
		wantFinal        string
		wantCommission   string
		wantPhotographer string
	}{
		{
			name:             "founder + new seeker: 0% commission on discounted price",
			photographer:     repository.Photographer{IsFounder: true},
			seeker:           repository.Seeker{WelcomeDiscountUsed: false},
			age:              0,
			wantFinal:        "80",
			wantCommission:   "0",
			wantPhotographer: "80",
		},
		{
			name:             "pioneer + returning seeker + recent photo",
			photographer:     repository.Photographer{IsPioneer: true},
			seeker:           repository.Seeker{WelcomeDiscountUsed: true},
			age:              5 * 24 * time.Hour,
			wantFinal:        "100",
			wantCommission:   "8",
			wantPhotographer: "92",
		},
		{
			name:             "standard + returning seeker + historical deep",
			photographer:     repository.Photographer{},
			seeker:           repository.Seeker{WelcomeDiscountUsed: true},
			age:              7 * 30 * 24 * time.Hour,
			wantFinal:        "50",
			wantCommission:   "7.5",
			wantPhotographer: "42.5",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := Calculate(base, tc.photographer, tc.seeker, tc.age)

			check := func(label, want string, got decimal.Decimal) {
				w := decimal.RequireFromString(want)
				if !got.Equal(w) {
					t.Errorf("%s: got %s, want %s", label, got, w)
				}
			}

			check("FinalPrice", tc.wantFinal, got.FinalPrice)
			check("CommissionAmount", tc.wantCommission, got.CommissionAmount)
			check("PhotographerPay", tc.wantPhotographer, got.PhotographerPay)
		})
	}
}
