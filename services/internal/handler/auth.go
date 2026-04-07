package handler

import (
	"crypto/rand"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/kapt/api/internal/repository"
)

// RequestOTPPayload defines the input structure for an OTP request
type RequestOTPPayload struct {
	Email string `json:"email"`
}

// RequestOTP handles the generation and persistence of the access code
func (h *Handler) RequestOTP(w http.ResponseWriter, r *http.Request) {
	var payload RequestOTPPayload

	// Decode the incoming JSON request body
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid or malformed email address", http.StatusBadRequest)
		return
	}

	// 1. Generate a secure 6-digit numeric code
	code, err := generateRandomCode(6)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	// 2. Persist the OTP in Neon via SQLC (Set to expire in 10 minutes)
	// The Upsert operation ensures that any previous code for this email is replaced
	_, err = h.repo.UpsertOTP(r.Context(), repository.UpsertOTPParams{
		Email:     payload.Email,
		Code:      code,
		ExpiresAt: time.Now().Add(10 * time.Minute),
	})

	if err != nil {
		http.Error(w, "Failed to process the request in the database", http.StatusInternalServerError)
		return
	}

	// 3. Send successful response
	// In a production environment, this is where the email trigger (Resend/SendGrid) occurs
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{
		"message": "OTP sent successfully",
		"code":    code, // Exposed here for testing purposes via Postman/Insomnia
	}); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}

// VerifyOTPPayload defines the input structure for an OTP verification request
type VerifyOTPPayload struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}

// VerifyOTP validates the OTP, marks it used, provisions the seeker, and returns a signed JWT
func (h *Handler) VerifyOTP(w http.ResponseWriter, r *http.Request) {
	var payload VerifyOTPPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil || payload.Email == "" || payload.Code == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		if err := json.NewEncoder(w).Encode(map[string]string{"error": "invalid request"}); err != nil {
			http.Error(w, "internal server error", http.StatusInternalServerError)
		}
		return
	}

	// 1. Validate OTP — check it exists, is unused, and not expired
	otp, err := h.repo.VerifyOTP(r.Context(), repository.VerifyOTPParams{
		Email: payload.Email,
		Code:  payload.Code,
	})
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			if err := json.NewEncoder(w).Encode(map[string]string{"error": "invalid or expired code"}); err != nil {
				http.Error(w, "internal server error", http.StatusInternalServerError)
			}
			return
		}
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	// 2. Consume the OTP immediately to prevent replay attacks
	if err := h.repo.MarkOTPUsed(r.Context(), otp.ID); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	// 3. Get or create the seeker
	seeker, err := h.repo.GetSeekerByEmail(r.Context(), payload.Email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			seeker, err = h.repo.CreateSeeker(r.Context(), payload.Email)
			if err != nil {
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}
		} else {
			http.Error(w, "internal server error", http.StatusInternalServerError)
			return
		}
	}

	// 4. Sign a JWT with HS256
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	claims := jwt.MapClaims{
		"sub": seeker.ID.String(),
		"iat": time.Now().Unix(),
		"exp": time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(secret))
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	// 5. Return the token
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(map[string]string{"token": signed}); err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}

// generateRandomCode creates a cryptographically secure numeric string.
// Returns an error if the OS entropy source fails — callers must not fall back
// to a predictable value.
func generateRandomCode(max int) (string, error) {
	var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}
	b := make([]byte, max)

	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if err != nil || n != max {
		return "", fmt.Errorf("entropy failure: read %d of %d bytes: %w", n, max, err)
	}

	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b), nil
}
