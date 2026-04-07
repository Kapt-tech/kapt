GOOSE     := $(shell go env GOPATH)/bin/goose
SQLC      := $(shell go env GOPATH)/bin/sqlc
MIGRATION_DIR := sqlc/migration
DB_DRIVER := postgres

.PHONY: migrate-up migrate-down migrate-status migrate-reset migrate-create sqlc-generate

## Run all pending migrations
migrate-up:
	$(GOOSE) -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DATABASE_URL)" up

## Roll back the last applied migration
migrate-down:
	$(GOOSE) -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DATABASE_URL)" down

## Show current migration status
migrate-status:
	$(GOOSE) -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DATABASE_URL)" status

## Roll back all migrations (use with caution)
migrate-reset:
	$(GOOSE) -dir $(MIGRATION_DIR) $(DB_DRIVER) "$(DATABASE_URL)" reset

## Create a new migration file: make migrate-create NAME=<description>
migrate-create:
	$(GOOSE) -dir $(MIGRATION_DIR) create $(NAME) sql

## Regenerate sqlc Go code from schema and queries
sqlc-generate:
	$(SQLC) generate -f sqlc.yaml
