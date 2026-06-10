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
        <Link
          href="/signup"
          title="coming soon...."
          className="touch-manipulation select-none rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#ffe16a] active:shadow-none"
        >
          SignUp
        </Link>
        {/* <Link
          href="/signin"
          className="touch-manipulation select-none rounded-md border-2 border-black bg-[#f4cf45] px-4 py-2 text-sm font-black text-[#11110f] shadow-[4px_4px_0_#050505] transition-transform duration-150 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#050505] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4cf45] active:translate-x-1 active:translate-y-1 active:bg-[#ffe16a] active:shadow-none"
        >
          Get started
        </Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
