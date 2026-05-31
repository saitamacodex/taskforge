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
    await createProject(name, description);
    setName("");
    setDescription("");
    onClose();
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-16 mb-16 max-w-lg mx-auto">
      <h2 className="text-white font-medium mb-4">New Project</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-gray-800 text-white text-sm px-4 py-2 rounded-lg mb-3 outline-none"
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-gray-800 text-white text-sm px-4 py-2 rounded-lg mb-4 outline-none"
      />
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Create
        </button>
        <button
          onClick={onClose}
          className="text-gray-400 text-sm px-4 py-2 rounded-lg hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
