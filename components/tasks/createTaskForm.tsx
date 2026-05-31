"use client";
import { createTask } from "@/actions/task.actions";
import { useState } from "react";

function CreateTaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState("");

  async function handleSubmit() {
    if (!title) return;
    const response = await createTask(title, projectId);

    if (response.success) {
      setTitle("");
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-md border-4 border-black bg-[#242424] p-4 shadow-[8px_8px_0_#050505] sm:flex-row">
      <input
        type="text"
        placeholder="Add a new task....."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="min-w-0 flex-1 rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-black text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white"
      />
      <button
        onClick={handleSubmit}
        className="touch-manipulation select-none rounded-md border-2 border-black bg-[#f4cf45] px-5 py-3 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#ffe16a] active:shadow-none"
      >
        + ADD
      </button>
    </div>
  );
}

export default CreateTaskForm;
