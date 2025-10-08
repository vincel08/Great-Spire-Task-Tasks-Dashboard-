# Mini Task Board

This is a simple task management app built with **React** on the frontend and **Node.js + SQLite** on the backend. The app lets you:

- Add new tasks with a title.
- View tasks grouped by status (todo, in-progress, done).
- Change a task's status using buttons.
- Delete tasks.
- Refresh the task list from the backend.

## What’s implemented

- Task creation, status update, deletion, and refresh.
- Tasks are grouped by status (simple Kanban-style board).
- Uses an internal SQLite database for quick setup and development.

## What’s skipped

- Drag-and-drop for moving tasks (status changes are done via buttons).
- Advanced styling and animations (UI kept simple to focus on functionality).
- User authentication (single-user app).

## How to run

### Start the backend

```bash
cd backend
npm install
node src/server.js
```

### Start the frontend

```bash
cd frontend
npm install
npm run dev
```
