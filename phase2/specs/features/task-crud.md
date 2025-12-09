# Feature: Task CRUD Operations (Multi-User)

## User Stories

- As an authenticated user, I can create a task.
- As an authenticated user, I can view all **my** tasks.
- As an authenticated user, I can update my tasks.
- As an authenticated user, I can delete my tasks.
- As an authenticated user, I can mark my tasks as complete.

## Acceptance Criteria

### Create

- Title is required (1–200 chars).
- Description is optional (max 1000 chars).
- Task is associated with the **JWT user_id**.
- On success, API returns created Task object.
- On error, returns 400 with validation details.

### Read (List)

- `GET /api/{user_id}/tasks` returns **only that user’s tasks**.
- Supports filtering by status & priority (details in API spec).
- Supports search by keyword in title/description.

### Update

- Only the owner (current JWT user) can update.
- Unknown or forbidden IDs return 404 or 403 (implementation choice documented in ADR).
- `updated_at` changes on update.

### Delete

- Only owner can delete.
- Deleting removes the row (no soft delete needed for Phase II).

### Complete / Toggle

- `PATCH /api/{user_id}/tasks/{id}/complete` toggles status.
- If currently `"open"` → becomes `"done"`.
- If `"done"` → becomes `"open"` (if toggle is bi-directional).
