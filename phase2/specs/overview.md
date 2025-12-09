# Todo App Overview – Hackathon II

## Purpose

A Todo application that evolves from a simple Python console app (Phase I) into a full AI-native, cloud-native system (Phases II–V). This project uses **Spec-Driven Development** with **Claude Code** and **Spec-Kit Plus**.

## Current Phase

**Phase II – Todo Full-Stack Web Application**

- Multi-user
- Authenticated with Better Auth
- Persistent storage in Neon PostgreSQL
- REST API + modern web UI

## Tech Stack (Phase II)

- **Frontend**: Next.js (App Router, 16+ compatible; current minimum = 13.4), Tailwind CSS, JavaScript
- **Backend**: FastAPI (Python)
- **ORM**: SQLModel
- **Database**: Neon serverless PostgreSQL (with SQLite fallback for local)
- **Authentication**: Better Auth (Next.js) issuing JWT
- **Spec-Driven**: Claude Code + Spec-Kit Plus

## Phase II Features

- Task CRUD operations (Basic Level)
- Priorities & tags
- Search & filter
- Sorting
- Multi-user isolation via JWT (each user sees only their tasks)
