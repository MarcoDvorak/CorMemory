'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopMenuBar() {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-white shadow-sm z-50">
      <div className="max-w-4xl mx-auto flex items-center gap-6 px-4 py-2 rounded-b-xl">
        <Link href="/" legacyBehavior>
          <a className={`text-base font-medium px-3 py-2 rounded-lg transition-colors ${pathname === '/' ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}>My Memories</a>
        </Link>
        <Link href="/collections" legacyBehavior>
          <a className={`text-base font-medium px-3 py-2 rounded-lg transition-colors ${pathname.startsWith('/collections') ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'}`}>Collections</a>
        </Link>
      </div>
    </nav>
  );
} 