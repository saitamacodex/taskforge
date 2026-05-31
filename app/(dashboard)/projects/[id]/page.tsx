import { Project, Task } from "@/lib/db/schema";
import Link from "next/link";
import TaskItem from "@/components/tasks/taskItem";
import CreateTaskForm from "@/components/tasks/createTaskForm";

// ISR: revalidate this page every 60 seconds to keep data fresh
export const revalidate = 60;

async function getProjectById(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL(`/api/projects/${id}`, baseUrl);
  const response = await fetch(url.toString());

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload?.data ?? null;
}

async function getTasksByProjectId(prjId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL(`/api/tasks?projectId=${prjId}`, baseUrl);
  const response = await fetch(url.toString());

  if (!response.ok) {
    return [];
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const project: Project | null = await getProjectById(id);

  const tasks: Task[] = await getTasksByProjectId(id);

  if (!project) {
    return (
      <div className="mx-auto min-h-screen max-w-3xl p-5 sm:p-8">
        <div className="rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505]">
          <p className="text-2xl font-black text-[#f8f6ed]">
            Project not found
          </p>
        </div>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505]"
        >
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  // check completed tasks for stats
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="mx-auto min-h-screen max-w-5xl p-5 sm:p-8 lg:p-10">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="mb-8 inline-block rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505]"
      >
        ← Back
      </Link>

      {/* Project header */}
      <div className="mb-8 rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505] sm:p-8">
        <h1 className="mb-3 break-word text-4xl font-black leading-tight text-[#f8f6ed] [text-shadow:4px_4px_0_#050505] sm:text-5xl">
          {project.name}
        </h1>
        {project.description && (
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[#b8b8bf] sm:text-base">
            {project.description}
          </p>
        )}
      </div>

      {/* Tasks stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-md border-4 border-black bg-[#f4cf45] p-5 text-center shadow-[6px_6px_0_#050505]">
          <p className="text-4xl font-black text-[#11110f]">{tasks.length}</p>
          <p className="mt-1 text-xs font-black text-[#11110f]">TOTAL</p>
        </div>
        <div className="rounded-md border-4 border-black bg-[#6ee787] p-5 text-center shadow-[6px_6px_0_#050505]">
          <p className="text-4xl font-black text-[#11110f]">{completedTasks}</p>
          <p className="mt-1 text-xs font-black text-[#11110f]">DONE</p>
        </div>
        <div className="rounded-md border-4 border-black bg-[#ff5a5f] p-5 text-center shadow-[6px_6px_0_#050505]">
          <p className="text-4xl font-black text-[#11110f]">{pendingTasks}</p>
          <p className="mt-1 text-xs font-black text-[#11110f]">PENDING</p>
        </div>
      </div>
      {/* Add task form */}

      <CreateTaskForm projectId={id} />

      {/* SHow list of tasks */}
      <div className="mt-8 flex flex-col">
        <p className="mb-4 w-fit rounded-md border-2 border-black bg-[#242424] px-4 py-2 text-md font-black text-[#f8f6ed] shadow-[4px_4px_0_#050505]">
          {" "}
          TASKS
        </p>
        {tasks.length === 0 ? (
          <p className="rounded-md border-4 border-dashed border-black bg-[#242424] p-8 text-center text-sm font-black text-[#b8b8bf] shadow-[6px_6px_0_#050505]">
            No tasks yet - add one above!
          </p>
        ) : (
          tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
