package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestLoadEnvFile(t *testing.T) {
	tmpDir := t.TempDir()
	filePath := filepath.Join(tmpDir, ".env")
	content := "DB_SOURCE=postgresql://user:pass@localhost:5432/kapt_local?sslmode=disable\nJWT_SECRET=test-secret-1234567890\n"
	if err := os.WriteFile(filePath, []byte(content), 0o600); err != nil {
		t.Fatalf("failed to write temp .env: %v", err)
	}

	oldWd, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get cwd: %v", err)
	}
	defer os.Chdir(oldWd)

	if err := os.Chdir(tmpDir); err != nil {
		t.Fatalf("failed to chdir: %v", err)
	}

	os.Unsetenv("DB_SOURCE")
	os.Unsetenv("JWT_SECRET")

	if err := loadEnvFile(".env"); err != nil {
		t.Fatalf("loadEnvFile failed: %v", err)
	}

	if got := os.Getenv("DB_SOURCE"); got != "postgresql://user:pass@localhost:5432/kapt_local?sslmode=disable" {
		t.Fatalf("expected DB_SOURCE from .env, got %q", got)
	}
	if got := os.Getenv("JWT_SECRET"); got != "test-secret-1234567890" {
		t.Fatalf("expected JWT_SECRET from .env, got %q", got)
	}
}

func TestLoadEnvFilePreservesExistingEnv(t *testing.T) {
	tmpDir := t.TempDir()
	filePath := filepath.Join(tmpDir, ".env")
	content := "JWT_SECRET=from-file-secret\n"
	if err := os.WriteFile(filePath, []byte(content), 0o600); err != nil {
		t.Fatalf("failed to write temp .env: %v", err)
	}

	oldWd, err := os.Getwd()
	if err != nil {
		t.Fatalf("failed to get cwd: %v", err)
	}
	defer os.Chdir(oldWd)

	if err := os.Chdir(tmpDir); err != nil {
		t.Fatalf("failed to chdir: %v", err)
	}

	os.Setenv("JWT_SECRET", "existing-secret")
	defer os.Unsetenv("JWT_SECRET")

	if err := loadEnvFile(".env"); err != nil {
		t.Fatalf("loadEnvFile failed: %v", err)
	}

	if got := os.Getenv("JWT_SECRET"); got != "existing-secret" {
		t.Fatalf("expected existing JWT_SECRET to win, got %q", got)
	}
}
