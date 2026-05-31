"use client";

import { Project } from "@/lib/db/schema";
import Link from "next/link";
import { deleteProject } from "@/actions/project.actions";

export default function ProjectCard({ project }: { project: Project }) {
  // delete project with server actions
  async function handleDelete() {
    await deleteProject(project.id);
  }

  return (
    <div className="rounded-md border-4 border-black bg-[#242424] p-5 shadow-[8px_8px_0_#050505]">
      <p className="text-xl font-black text-[#f8f6ed]">{project.name}</p>
      <p className="mt-2 min-h-10 text-sm font-medium leading-relaxed text-[#b8b8bf]">
        {project.description}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex touch-manipulation select-none items-center gap-2 rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-base font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#ffe16a] active:shadow-none"
        >
          Open <span>&rarr;</span>
        </Link>
        <button
          onClick={handleDelete}
          aria-label="Delete board"
          className="inline-flex h-11 w-11 touch-manipulation select-none items-center justify-center rounded-md border-2 border-black bg-[#b0363a] text-lg shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#c84448] hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:shadow-none"
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
    </div>
  );
}
