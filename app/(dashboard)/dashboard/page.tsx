import ProjectCard from "@/components/projects/projectCard";
import CreatePorjectForm from "@/components/projects/createProjectForm";
import { Project } from "@/lib/db/schema";

async function getProjects() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL("/api/projects", baseUrl);
  const response = await fetch(url.toString());

  if (!response.ok) {
    return [];
  }

  const payload = await response.json();
  return payload?.data ?? [];
}

async function DashboardPage() {
  const allProjects: Project[] = await getProjects();

  return (
    <div className="p-8">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-medium">My Projects</h1>
        <CreatePorjectForm />
      </div>

      {/* projects grid */}
      <div className="grid grid-cols-3 gap-4">
        {allProjects.map((porject) => (
          <ProjectCard key={porject.id} project={porject} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
