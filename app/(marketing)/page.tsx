import React from "react";
import Link from "next/link";

function LandingPage() {
  const features = [
    {
      icon: "⚒️",
      title: "Forge Your Plans",
      description:
        "Organize your work into projects and keep related tasks together.",
    },
    {
      icon: "✓",
      title: "Manage Tasks",
      description:
        "Capture every task, big or small, and track progress effortlessly.",
    },
    {
      icon: "🎯",
      title: "Hit Your Goals",
      description: "Stay focused, organized, and productive every single day.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <section className="px-5 py-20 text-center sm:px-8 md:py-28">
        <h1 className="mx-auto mb-6 max-w-6xl text-balance text-5xl font-black leading-[0.95] tracking-normal text-[#f8f6ed] [text-shadow:5px_5px_0_#050505] sm:text-6xl md:text-7xl lg:text-8xl">
          Organize your work, <br />{" "}
          <span className="text-[#f4cf45]">one project at a time</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-semibold leading-8 text-[#b8b8bf] md:text-xl">
          Create projects, manage tasks, and stay on top of everything - all in
          one simple place.
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded-md border-4 border-black bg-[#f4cf45] px-8 py-3.5 text-sm font-black text-[#11110f] shadow-[7px_7px_0_#050505] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_#050505]"
        >
          Start for free
        </Link>
      </section>

      {/* Features section */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-5 py-16 sm:px-8 md:grid-cols-3">
        {features.map((feature) => {
          return (
            <div
              key={feature.title}
              className="rounded-md border-4 border-black bg-[#242424] p-6 shadow-[8px_8px_0_#050505]"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border-2 border-black bg-[#f4cf45] text-2xl shadow-[3px_3px_0_#050505]">
                {feature.icon}
              </span>
              <h3 className="mt-4 mb-2 text-lg font-black text-[#f8f6ed]">
                {feature.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-[#b8b8bf]">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
      {/* footer */}
      <footer className="mt-16 border-t-4 border-black bg-[#242424] py-8 text-center text-sm font-bold text-[#b8b8bf] shadow-[0_-6px_0_#050505]">
        Built with Next.js - TaskForge {new Date().getFullYear()}
      </footer>
    </main>
  );
}

export default LandingPage;
