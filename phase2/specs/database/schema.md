
---

### 2.8 `specs/database/schema.md`

```md
# Database Schema – Phase II

## Tables

### users

Managed by Better Auth (frontend), but backend assumes:

- `id`: string (primary key)
- `email`: string
- `created_at`: timestamp

Backend does **not** manage this table directly in Phase II.

### tasks

- `id`: integer (primary key)
- `user_id`: string (foreign key to users.id – logical association)
- `title`: string (not null)
- `description`: text (nullable)
- `status`: string (default "open")
- `priority`: string (nullable; "low" | "medium" | "high")
- `tags`: JSON or text (nullable)
- `due_date`: timestamp (nullable)
- `is_recurring`: boolean (default false)
- `recurrence_rule`: text (nullable)
- `created_at`: timestamp
- `updated_at`: timestamp

## Indexes

- `tasks.user_id`
- `tasks.status`
- `tasks.priority`
