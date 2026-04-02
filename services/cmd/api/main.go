package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/kapt/api/internal/handler"
	"github.com/kapt/api/internal/repository"
	_ "github.com/lib/pq"
)

func main() {
	dbSource := os.Getenv("DB_SOURCE")
	if dbSource == "" {
		dbSource = "postgresql://postgres:postgres@db:5432/kapt?sslmode=disable"
	}

	if os.Getenv("JWT_SECRET") == "" {
		log.Fatal("JWT_SECRET environment variable is required")
	}

	conn, err := sql.Open("postgres", dbSource)
	if err != nil {
		log.Fatalf("failed to open connection: %v", err)
	}
	defer conn.Close()

	if err = conn.Ping(); err != nil {
		log.Fatalf("database unreachable: %v", err)
	}

	fmt.Println("🚀 Kapt API: database connection established!")

	queries := repository.New(conn)
	h := handler.NewHandler(queries)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		var n int
		if err := conn.QueryRowContext(r.Context(), "SELECT 1").Scan(&n); err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusServiceUnavailable)
			if encErr := json.NewEncoder(w).Encode(map[string]string{"status": "error"}); encErr != nil {
				log.Printf("health encode error: %v", encErr)
			}
			return
		}
		w.Header().Set("Content-Type", "application/json")
		if encErr := json.NewEncoder(w).Encode(map[string]string{"status": "ok"}); encErr != nil {
			log.Printf("health encode error: %v", encErr)
		}
	})

	mux.HandleFunc("POST /auth/request", h.RequestOTP)
	mux.HandleFunc("POST /auth/verify", h.VerifyOTP)
	mux.HandleFunc("GET /api/v1/photographers", h.ListPhotographers)
	mux.HandleFunc("POST /api/v1/photographers", h.CreatePhotographer)

	addr := ":8080"
	fmt.Printf("✅ Kapt API listening on %s\n", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
