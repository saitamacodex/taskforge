import { Project, Task } from "@/lib/db/schema";
import Link from "next/link";
import TaskItem from "@/components/tasks/taskItem";
import CreateTaskForm from "@/components/tasks/createTaskForm";

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
      <div className="p-8">
        <p className="text-white font-bold">Project not found</p>
        <Link
          href="/dashboard"
          className="text-yellow-400 font-bold mt-4 block"
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
    <div className="p-8 max-w-3xl mx-auto">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-block text-yellow-400 font-bold text-sm border-2 border-yellow-400 px-3 py-1 mb-6 hover:bg-yellow-400 hover:text-black transition-colors"
      >
        ← Back
      </Link>

      {/* Project header */}
      <div className="border-2 border-white p-6 mb-6 shadow-[4px_4px_0px_#ffffff]">
        <h1 className="text-white text-3xl font-black mb-2">{project.name}</h1>
        {project.description && (
          <p className="text-gray-400 text-sm">{project.description}</p>
        )}
      </div>

      {/* Tasks stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border-2 border-white p-4 text-center shadow-[4px_4px_0px_#ffffff]">
          <p className="text-yellow-400 text-2xl font-black">{tasks.length}</p>
          <p className="text-gray-500 text-xs font-bold mt-1">TOTAL</p>
        </div>
        <div className="border-2 border-white p-4 text-center shadow-[4px_4px_0px_#ffffff]">
          <p className="text-green-400 text-2xl font-black">{completedTasks}</p>
          <p className="text-gray-500 text-xs font-bold mt-1">DONE</p>
        </div>
        <div className="border-2 border-white p-4 text-center shadow-[4px_4px_0px_#ffffff]">
          <p className="text-red-400 text-2xl font-black">{pendingTasks}</p>
          <p className="text-gray-500 text-xs font-bold mt-1">PENDING</p>
        </div>
      </div>
      {/* Add task form */}

      <CreateTaskForm projectId={id} />

      {/* SHow list of tasks */}
      <div className="flex flex-col mt-6">
        <p className="text-gray-500 text-xs font-bold"> TASKS</p>
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-sm font-bold border-2 border-dashed border-gray-700 p-6 text-center">
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
