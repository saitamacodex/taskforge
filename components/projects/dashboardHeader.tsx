"use client";

import { useState } from "react";
import CreateProjectForm from "./createProjectForm";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-2xl font-medium">My Projects</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-900"
        >
          + New Project
        </button>
      </div>

      {isOpen && <CreateProjectForm onClose={() => setIsOpen(false)} />}
    </div>
  );
}
