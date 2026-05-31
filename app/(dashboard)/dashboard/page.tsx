import ProjectCard from "@/components/projects/projectCard";
import { Project } from "@/lib/db/schema";
import DashboardHeader from "@/components/projects/dashboardHeader";

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
      <DashboardHeader />
      <div className="grid grid-cols-3 gap-4">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
