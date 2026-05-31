// components/layout/dashboard-navbar.tsx
import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b-2 border-black sticky top-0 z-50 bg-[#11110f]/95 backdrop-blur-sm shadow-[0_4px_0_#050505]">
      <Link href="/" className="font-black text-yellow-400 text-xl">
        TaskForge
      </Link>
      <Link
        href="/"
        className="touch-manipulation select-none border-2 border-white px-4 py-2 text-sm font-bold text-white shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-white hover:text-black hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        ← Home
      </Link>
    </nav>
  );
}
