"use client";

import { useState } from "react";
import CreateProjectForm from "./createProjectForm";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-col gap-4 border-b-4 border-none pb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black text-[#f8f6ed] [text-shadow:4px_4px_0_#050505] sm:text-5xl">
          Your Workspace
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-fit touch-manipulation select-none rounded-md border-4 border-black bg-[#f4cf45] px-5 py-2.5 text-sm font-black text-[#11110f] shadow-[6px_6px_0_#050505] transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1.5 active:translate-y-1.5 active:bg-[#ffe16a] active:shadow-none"
        >
          + New Board
        </button>
      </div>

      {isOpen && <CreateProjectForm onClose={() => setIsOpen(false)} />}
    </div>
  );
}
