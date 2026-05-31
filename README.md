# TaskForge

A full stack productivity app to organize your work — create projects, manage tasks, and track progress.

**Live → [taskforge-teal.vercel.app](https://taskforge-teal.vercel.app)**

---

## Tech Stack

|            |                         |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Database   | Neon PostgreSQL         |
| ORM        | Drizzle ORM             |
| Validation | Zod                     |
| Styling    | Tailwind CSS            |
| Deployment | Vercel                  |

---

## Features

- Create, update and delete projects
- Add, complete and delete tasks
- Project-based task organization
- Real-time task toggle via API
- Neobrutalist dark theme
- Fully responsive

---

## Rendering Strategy

| Page          | Route            | Strategy  | Reason                            |
| ------------- | ---------------- | --------- | --------------------------------- |
| Landing       | `/`              | SSG       | Static content, never changes     |
| Dashboard     | `/dashboard`     | SSR       | Always fresh project list         |
| Project board | `/projects/[id]` | ISR (60s) | Cached but refreshes periodically |

---

## API Routes vs Server Actions

| Action         | Approach        | Reason                           |
| -------------- | --------------- | -------------------------------- |
| Fetch projects | API Route (GET) | Can be used by external clients  |
| Fetch tasks    | API Route (GET) | Supports query param filtering   |
| Toggle task    | API Route (PUT) | Called from client component     |
| Create project | Server Action   | Form submission, no fetch needed |
| Delete project | Server Action   | Button click, no fetch needed    |
| Create task    | Server Action   | Form submission, no fetch needed |
| Delete task    | Server Action   | Button click, no fetch needed    |

---

## Project Structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx            # Marketing layout (navbar)
│   │   └── page.tsx              # Landing page "/"
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Dashboard layout (navbar)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # "/dashboard" — all projects (SSR)
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.tsx      # "/projects/:id" — tasks (ISR)
│   │
│   ├── api/
│   │   ├── projects/
│   │   │   ├── route.ts          # GET all, POST
│   │   │   └── [id]/route.ts     # GET one, PUT, DELETE
│   │   └── tasks/
│   │       ├── route.ts          # GET (supports ?projectId=), POST
│   │       └── [id]/route.ts     # PUT, DELETE
│   │
│   ├── globals.css
│   └── layout.tsx                # Root layout
│
├── lib/
│   ├── db/
│   │   ├── index.ts              # Drizzle connection
│   │   └── schema.ts             # Projects + Tasks schema
│   ├── api-error.ts              # Custom ApiError class
│   ├── api-handler.ts            # Global error handler wrapper
│   ├── validate.ts               # Zod validation helper
│   └── validations.ts            # All Zod schemas
│
├── actions/
│   ├── project.actions.ts        # Server Actions for projects
│   └── task.actions.ts           # Server Actions for tasks
│
└── components/
    ├── layout/
    │   ├── navbar.tsx             # Marketing navbar
    │   └── dashboard-navbar.tsx  # Dashboard navbar
    ├── projects/
    │   ├── project-card.tsx
    │   ├── create-project-form.tsx
    │   └── dashboard-header.tsx
    └── tasks/
        ├── task-item.tsx
        └── create-task-form.tsx
```

---

## Database Schema

```
projects                    tasks
────────                    ─────
id (uuid)                   id (uuid)
name (text)                 title (text)
description (text?)         isCompleted (boolean)
createdAt (timestamp)       projectId (uuid → projects.id)
updatedAt (timestamp)       createdAt (timestamp)
                            updatedAt (timestamp)
```

`onDelete: cascade` — deleting a project deletes all its tasks automatically.

---

## Error Handling

All API routes use a `withErrorHandler` wrapper and a custom `ApiError` class:

```ts
export const GET = withErrorHandler(async (req) => {
  const project = await db.select()...
  if (!project) throw ApiError.NOT_FOUND("Project not found");
  return NextResponse.json({ success: true, data: project });
});
```

Errors are returned as structured JSON:

```json
{ "success": false, "message": "Project not found" }
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/taskforge.git
cd taskforge

# 2. Install dependencies
pnpm install

# 3. Add environment variables
cp .env.example .env.local
# Fill in DATABASE_URL and NEXT_PUBLIC_APP_URL

# 4. Push schema to database
pnpm db:push

# 5. Run the dev server
pnpm dev
```

---

## Environment Variables

```bash
DATABASE_URL=postgresql://...        # Neon connection string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
