"use client";

import { createProject } from "@/actions/project.actions";
import { useState } from "react";

export default function CreatePorjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit() {
    if (!name) {
      return;
    }
    const response = await createProject(name, description);
    if (response?.success) {
      setName("");
      setDescription("");
      setIsOpen(false);
    }

    // check data coming on save
    console.log(response?.data);
  }

  return (
    <div className="flex flex-col items-end">
      <button
        className="bg-purple-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-900 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        + New Project
      </button>

      {isOpen && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 w-80 mt-2">
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
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700 cursor-pointer"
          >
            Create Project
          </button>
        </div>
      )}
    </div>
  );
}
