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
    <div className="min-h-screen p-5 sm:p-8 lg:p-10">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
