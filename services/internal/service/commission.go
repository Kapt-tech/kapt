package service

import (
	"time"

	"github.com/shopspring/decimal"

	"github.com/kapt/api/internal/repository"
)

var (
	rateFounder  = decimal.NewFromInt(0)
	ratePioneer  = decimal.NewFromFloat(0.08)
	rateStandard = decimal.NewFromFloat(0.15)

	discountWelcome         = decimal.NewFromFloat(0.20)
	discountHistoricalShort = decimal.NewFromFloat(0.30)
	discountHistoricalDeep  = decimal.NewFromFloat(0.50)

	historicalShortThreshold = 3 * 30 * 24 * time.Hour
	historicalDeepThreshold  = 6 * 30 * 24 * time.Hour
)

// PhotoPrice holds the full breakdown of a single photo transaction.
type PhotoPrice struct {
	BasePrice        decimal.Decimal
	FinalPrice       decimal.Decimal
	CommissionAmount decimal.Decimal
	PhotographerPay  decimal.Decimal
	DiscountApplied  decimal.Decimal
	DiscountReason   string
}

// PhotographerTier returns the commission rate for a photographer.
// Priority: Founder (0%) > Pioneer (8%) > Standard (15%).
func PhotographerTier(p repository.Photographer) decimal.Decimal {
	if p.IsFounder {
		return rateFounder
	}
	if p.IsPioneer {
		return ratePioneer
	}
	return rateStandard
}

// ApplyDiscount returns the discounted price and a human-readable reason.
// Welcome Pioneer takes priority over Historical Pack when both apply.
func ApplyDiscount(basePrice decimal.Decimal, s repository.Seeker, photoAge time.Duration) (decimal.Decimal, string) {
	if !s.WelcomeDiscountUsed {
		return basePrice.Mul(decimal.NewFromInt(1).Sub(discountWelcome)), "Welcome Pioneer -20%"
	}
	if photoAge > historicalDeepThreshold {
		return basePrice.Mul(decimal.NewFromInt(1).Sub(discountHistoricalDeep)), "Historical Pack -50%"
	}
	if photoAge > historicalShortThreshold {
		return basePrice.Mul(decimal.NewFromInt(1).Sub(discountHistoricalShort)), "Historical Pack -30%"
	}
	return basePrice, ""
}

// Calculate returns the full price breakdown for a photo purchase.
func Calculate(basePrice decimal.Decimal, p repository.Photographer, s repository.Seeker, photoAge time.Duration) PhotoPrice {
	discountedPrice, reason := ApplyDiscount(basePrice, s, photoAge)
	discountApplied := basePrice.Sub(discountedPrice)

	commissionRate := PhotographerTier(p)
	commissionAmount := discountedPrice.Mul(commissionRate)
	photographerPay := discountedPrice.Sub(commissionAmount)

	return PhotoPrice{
		BasePrice:        basePrice,
		FinalPrice:       discountedPrice,
		CommissionAmount: commissionAmount,
		PhotographerPay:  photographerPay,
		DiscountApplied:  discountApplied,
		DiscountReason:   reason,
	}
}
