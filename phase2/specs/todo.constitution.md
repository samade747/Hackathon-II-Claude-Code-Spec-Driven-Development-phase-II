# Todo Domain Constitution

This document defines non-negotiable rules for the Todo domain across all phases.

## Core Invariants

- A **Task** always belongs to exactly one user.
- A Task has a **title**, **status**, and **created_at** timestamp.
- Tasks are **never shared** between users in Phase II.
- All user actions must be **auditable** via timestamps (created_at, updated_at).

## Identity & Ownership

- Users are authenticated on the **frontend** via Better Auth.
- The backend identifies the user via **JWT tokens**:
  - The JWT is issued by Better Auth.
  - The backend verifies the JWT using a shared secret.
  - The JWT contains a unique `user_id` claim.
- Every Task row must store this `user_id` and all queries must filter by it.

## Persistence

- Primary production database: **Neon PostgreSQL**.
- For local development and tests: SQLite is allowed as a fallback.
- Schema changes must be reflected in:
  - `specs/database/schema.md`
  - SQLModel models
  - Pydantic schemas

## Security

- All REST endpoints in Phase II require a **valid JWT**.
- Requests without valid JWT → `401 Unauthorized`.
- A user cannot read, update, or delete any other user’s tasks.

## Evolution

- Future phases (AI chatbot, Kubernetes, Kafka, Dapr) must **honor this constitution** and build on it, not break it.
