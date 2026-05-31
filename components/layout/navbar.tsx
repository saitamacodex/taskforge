import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-between px-8 py-4 border-b border-gray-700">
      <Link href="/" className="font-medium text-lg text-white">
        TaskForge
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-sm text-gray-400 hover:text-white"
        >
          Sign In
        </Link>
        <Link
          href="/dashboard"
          className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
