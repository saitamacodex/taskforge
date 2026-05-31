"use client";

import { deleteTask } from "@/actions/task.actions";
import { Task } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

function TaskItem({ task }: { task: Task }) {
  const router = useRouter();

  async function handleDelete() {
    await deleteTask(task.id, task.projectId);
  }

  async function handleToggle() {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !task.isCompleted }),
    });
    router.refresh();
  }

  return (
    <div className="mb-4 flex items-center gap-4 rounded-md border-4 border-black bg-[#242424] p-4 shadow-[6px_6px_0_#050505] transition-transform hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#050505]">
      <input
        type="checkbox"
        checked={task.isCompleted}
        className="peer h-6 w-6 shrink-0 cursor-pointer accent-[#f4cf45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45]"
        onChange={handleToggle}
      />
      <span className="min-w-0 flex-1 wrap-break-word text-base font-black text-[#f8f6ed] peer-checked:text-[#8f8f96] peer-checked:line-through">
        {task.title}
      </span>
      <button
        onClick={handleDelete}
        aria-label="Delete task"
        className="inline-flex h-11 w-11 shrink-0 touch-manipulation select-none items-center justify-center rounded-md border-2 border-black bg-[#ff5a5f] text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#ff7478] hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        {/*  SVG icon for delete button */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M6 6l1 15h10l1-15" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
    </div>
  );
}

export default TaskItem;
