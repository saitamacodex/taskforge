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
        {allProjects.length === 0 ? (
          <div className="col-span-3 rounded-md border-4 border-dashed border-white p-12 text-center">
            <p className="text-2xl font-black text-white mb-2">
              No projects yet!
            </p>
            <p className="text-gray-500 font-bold text-sm">
              Click "+ New Board" to get started
            </p>
          </div>
        ) : (
          allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
