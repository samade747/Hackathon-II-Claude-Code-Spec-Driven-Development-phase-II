# Feature: Authentication with Better Auth + JWT

## Goal

Use **Better Auth** on the Next.js frontend to provide signup/signin and generate JWT tokens that the FastAPI backend can verify.

## User Stories

- As a visitor, I can sign up with email/password.
- As a user, I can sign in and stay authenticated.
- As an authenticated user, my frontend includes a JWT in API calls so the backend knows who I am.

## Acceptance Criteria

- Better Auth is configured in the frontend.
- On signin, a JWT is issued with:
  - `sub` or `user_id` claim.
  - Reasonable `exp` (e.g., 7 days).
- Backend can verify this JWT using the **shared secret** `BETTER_AUTH_SECRET`.
- If JWT is missing or invalid:
  - Backend returns `401 Unauthorized`.
- All `/api/{user_id}/tasks` routes:
  - Validate that `{user_id}` in path matches JWT `user_id`.
  - Otherwise return `403 Forbidden`.

## Non-functional

- No plain-text passwords ever leave Better Auth; backend trusts JWT, not credentials.
- JWT secret is stored in env var `BETTER_AUTH_SECRET` in both frontend and backend.
