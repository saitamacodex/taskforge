"use client";

import { createProject } from "@/actions/project.actions";
import { useState } from "react";

export default function CreateProjectForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    if (!name) return;
    const response = await createProject(name, description);
    if (response.success) {
      setName("");
      setDescription("");
      onClose();
    }
  }

  return (
    <div className="mx-auto mt-10 mb-14 max-w-lg rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505]">
      <h2 className="mb-5 text-2xl font-black text-[#f8f6ed]">New Board</h2>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-3 w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-5 w-full rounded-md border-2 border-black bg-[#f8f6ed] px-4 py-3 text-sm font-bold text-[#11110f] outline-none shadow-[3px_3px_0_#050505] placeholder:text-[#5c5c62] focus:bg-white"
      />
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="touch-manipulation select-none rounded-md border-2 border-black bg-[#f4cf45] px-5 py-2.5 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#ffe16a] active:shadow-none"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="touch-manipulation select-none rounded-md border-2 border-black bg-[#252525] px-5 py-2.5 text-sm font-black text-[#f8f6ed] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#333333] active:shadow-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
