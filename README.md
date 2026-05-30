# Project Structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   └── page.tsx              # Landing page "/"
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Dashboard layout (sidebar/topbar)
│   │   ├── dashboard/
│   │   │   └── page.tsx          # "/dashboard" - displays all projects
│   │   │
│   │   └── projects/
│   │       └── [id]/
│   │           └── page.tsx      # "/projects/:id" - project details & tasks
│   │
│   ├── api/
│   │   ├── projects/
│   │   │   ├── route.ts          # GET all projects, POST project
│   │   │   └── [id]/
│   │   │       └── route.ts      # GET, PUT, DELETE project
│   │   │
│   │   └── tasks/
│   │       ├── route.ts          # GET all tasks, POST task
│   │       └── [id]/
│   │           └── route.ts      # PUT, DELETE task
│   │
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
│
├── lib/
│   └── db/
│       ├── index.ts              # Drizzle database connection
│       └── schema.ts             # Database schema (Projects & Tasks)
│
├── actions/
│   ├── project.actions.ts        # Server Actions for project operations
│   └── task.actions.ts           # Server Actions for task operations
│
└── components/
    ├── projects/
    │   ├── project-card.tsx
    │   ├── create-project-form.tsx
    │   └── delete-project-button.tsx
    │
    └── tasks/
        ├── task-item.tsx
        ├── create-task-form.tsx
        └── delete-task-button.tsx
```

## Architecture Overview

- **Next.js App Router** for routing and server-side rendering.
- **Route Groups** separate marketing pages from authenticated dashboard pages.
- **Neon PostgreSQL** as the database.
- **Drizzle ORM** for type-safe database access.
- **Server Actions** handle mutations such as creating, updating, and deleting projects/tasks.
- **API Routes** provide REST endpoints when needed.
- **Reusable Components** organized by feature domain (Projects & Tasks).

## Core Features

- Create, update, and delete projects.
- Create, update, and delete tasks.
- Project-based task organization.
- Dashboard for project management.
- Type-safe database operations with Drizzle ORM.
- Modern full-stack architecture using Next.js 15.

```

```
