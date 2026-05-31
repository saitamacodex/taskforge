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
        className="text-sm font-bold text-white border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
      >
        ← Home
      </Link>
    </nav>
  );
}
