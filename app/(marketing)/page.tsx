import React from "react";
import Link from "next/link";

function LandingPage() {
  const features = [
    {
      icon: "📁",
      title: "Projects",
      description:
        "Group your tasks into focused projects. Keep work and personal tasks separate.",
    },
    {
      icon: "✅",
      title: "Tasks",
      description:
        "Add, complete, and delete tasks instantly. Simple checkboxes, no clutter.",
    },
    {
      icon: "🔗",
      title: "Share boards",
      description:
        "Share any project board via a public link. Let others see your progress.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="text-center px-8 py-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
          Organize your work, <br /> one project at a time
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10">
          Create projects, manage tasks, and stay on top of everything - all in
          one simple place.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-purple-600 text-white px-8 py-3.5 rounded-lg text-sm font-medium transition-colors hover:bg-purple-700 shadow-sm"
        >
          Start for free
        </Link>
      </section>

      {/* Features section */}
      <section className="px-8 py-16 max-w-4xl mx-auto grid grid-cols-3 gap-6">
        {features.map((feature) => {
          return (
            <div
              key={feature.title}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-white font-medium mt-3 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
      {/* footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-800 mt-16">
        Built with Next.js - TaskForge {new Date().getFullYear()}
      </footer>
    </main>
  );
}

export default LandingPage;
