# REST API Endpoints – Phase II

## Base URL

- Dev: `http://localhost:8000`

## Authentication

All endpoints require JWT:

```http
Authorization: Bearer <token>

Backend must:

Verify signature with BETTER_AUTH_SECRET.

Extract user_id.

Enforce that path_user_id == token_user_id.

Endpoints
GET /api/{user_id}/tasks

List tasks for the authenticated user.

Query params:

status: optional "open" | "done"

priority: optional "low" | "medium" | "high"

tag: optional single tag

q: optional search string (title/description)

sort_by: "created_at" | "due_date | "priority" | "title"

order: "asc" | "desc" (default "asc")

POST /api/{user_id}/tasks

Create a new task for the authenticated user.

Body:

title (required)

description (optional)

priority (optional)

tags (optional)

due_date (optional)

is_recurring (optional)

recurrence_rule (optional)

GET /api/{user_id}/tasks/{id}

Get details for a single task (owner only).

PUT /api/{user_id}/tasks/{id}

Update full task details.

DELETE /api/{user_id}/tasks/{id}

Delete task owned by user.

PATCH /api/{user_id}/tasks/{id}/complete

Toggle status between "open" and "done".