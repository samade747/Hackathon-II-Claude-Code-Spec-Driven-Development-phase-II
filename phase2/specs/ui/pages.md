# UI Pages – Phase II

## / (Home)

- Summary of hackathon + phases.
- CTA button: "Go to Tasks" → /todos.
- If user is not logged in, show "Sign in / Sign up" buttons.

## /todos

- Displays filters, list of tasks, "Add Task" button.
- Requires auth; redirect to login if not authenticated.

## /todos/new or modal

- Provides TodoForm in "create" mode.
- On success, navigates back to /todos.

## /todos/[id]

- Provides TodoForm in "edit" mode.
- Loads task via API.
- Allows updating fields and saving.
