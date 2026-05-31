import { Project } from "@/lib/db/schema";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
      <p className="text-white font-medium">{project.name}</p>
      <p className="text-gray-500 text-sm mt-1">{project.description}</p>
      <Link
        href={`/projects/${project.id}`}
        className="inline-flex items-center gap-2 border border-purple-500/50 px-3 py-1 text-base font-medium text-purple-400 transition-all duration-200 hover:border-purple-500 hover:text-purple-300"
      >
        Open <span>&rarr;</span>
      </Link>
    </div>
  );
}
