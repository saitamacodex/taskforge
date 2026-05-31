"use client";
import { createTask } from "@/actions/task.actions";
import { useState } from "react";

function CreateTaskForm({ projectId }: { projectId: string }) {
  const [title, setTitle] = useState("");

  async function handleSubmit() {
    if (!title) return;
    const response = await createTask(title, projectId);

    console.log("Create Task Response:", response);

    if (response.success) {
      setTitle("");
    }
  }

  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Add a new task....."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 bg-transparent border-2 border-white text-white font-bold text-sm px-4 py-2 outline-none placeholder:text-gray-600"
      />
      <button
        onClick={handleSubmit}
        className="bg-yellow-400 text-black font-black text-sm px-4 py-2 border-2 border-white shadow-[3px_3px_0px_#ffffff] hover:shadow-none hover:translate-x-0.75 hover:translate-y-0.75 transition-all"
      >
        + ADD
      </button>
    </div>
  );
}

export default CreateTaskForm;
