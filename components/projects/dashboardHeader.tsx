"use client";

import { useState } from "react";
import CreateProjectForm from "./createProjectForm";
import { logoutUser } from "@/actions/user.actions";

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="mb-6 flex flex-col gap-5 border-b-4 border-none pb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black text-[#f8f6ed] [text-shadow:4px_4px_0_#050505] sm:text-5xl">
          Your Workspace
        </h1>
        <div className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row min-[420px]:items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex touch-manipulation select-none items-center justify-center rounded-md border-4 border-black bg-[#f4cf45] px-5 py-2.5 text-sm font-black text-[#11110f] shadow-[6px_6px_0_#050505] transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1.5 active:translate-y-1.5 active:bg-[#ffe16a] active:shadow-none"
          >
            + New Board
          </button>
          <form action={logoutUser} className="min-[420px]:w-auto">
            <button
              type="submit"
              className="inline-flex w-full touch-manipulation select-none items-center justify-center gap-2 rounded-md border-4 border-black bg-[#b0363a] px-5 py-2.5 text-sm font-black text-[#f8f6ed] shadow-[6px_6px_0_#050505] transition-transform duration-150 hover:translate-x-1 hover:translate-y-1 hover:bg-[#c84448] hover:shadow-[3px_3px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1.5 active:translate-y-1.5 active:bg-[#982d31] active:shadow-none min-[420px]:w-auto"
            >
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
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 4v16" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </div>

      {isOpen && <CreateProjectForm onClose={() => setIsOpen(false)} />}
    </div>
  );
}
