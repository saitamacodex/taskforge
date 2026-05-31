import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-black bg-[#11110f]/95 px-5 py-4 shadow-[0_6px_0_#050505] backdrop-blur-sm sm:px-8">
      <Link
        href="/"
        className="text-2xl font-black text-[#f4cf45] [text-shadow:3px_3px_0_#050505]"
      >
        TaskForge
      </Link>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled
          title="coming soon...."
          className="cursor-not-allowed rounded-md border-2 border-black bg-[#252525] px-4 py-2 text-sm font-black text-[#9d9da3] opacity-80 shadow-[4px_4px_0_#050505]"
        >
          Sign In
        </button>
        <Link
          href="/dashboard"
          className="rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505]"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
