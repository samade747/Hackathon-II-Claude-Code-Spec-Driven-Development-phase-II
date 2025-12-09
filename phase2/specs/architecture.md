# System Architecture – Phase II

## High-Level View

- **Next.js App Router frontend** with Better Auth.
- **FastAPI backend** as a separate service.
- **Neon PostgreSQL** for persistent task storage.

## Communication

- Frontend → Backend via REST:
  - Base URL (dev): `http://localhost:8000`
  - All requests include `Authorization: Bearer <jwt>`.

## Auth & JWT

- Better Auth in Next.js:
  - Handles signup/signin.
  - Issues JWT on login.
  - Stores token securely (e.g., httpOnly cookie or secure storage).
- FastAPI:
  - Has JWT verification utility.
  - Extracts `user_id` from token.
  - Ensures URL `{user_id}` matches token’s `user_id`.

## Layers

- **Frontend**
  - `/app` – App Router pages
  - `/components` – Reusable UI
  - `/lib/api.js` – API client attaching JWT
- **Backend**
  - `app/main.py` – FastAPI app & routes registration
  - `app/models.py` – SQLModel models
  - `app/schemas.py` – Pydantic schemas
  - `app/api/tasks.py` – Task endpoints
  - `app/auth.py` – JWT verification helpers (from Better Auth secret)
  - `app/db.py` – DB connection

## Deployment (Later)

- Docker / Kubernetes / DigitalOcean DOKS will wrap these two services but will not change the basic structure.
