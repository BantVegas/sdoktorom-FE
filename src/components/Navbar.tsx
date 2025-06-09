"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Pacientske tlačidlá budú aj na /pacient aj na /priznaky a podstránkach
  const isPacientSection =
    pathname.startsWith("/pacient") ||
    pathname.startsWith("/priznaky");

  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center
        bg-white/30 backdrop-blur-md shadow-md fixed top-0 left-0 z-50 rounded-b-2xl">
      <div className="font-bold text-xl text-gray-800 dark:text-gray-200">
        sdoktorom.sk
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
          Domov
        </Link>
        <Link href="/ako-to-funguje" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
          Ako to funguje
        </Link>
        {isPacientSection && (
          <>
            <Link href="/pacient/objednat" className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition">
              Objednať sa
            </Link>
            <Link href="/history" className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition">
              História
            </Link>
            <Link href="/pacient/videohovor" className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition">
              Videohovor
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

