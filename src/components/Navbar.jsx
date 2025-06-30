'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCapsules, FaThList, FaHome, FaSpider } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Inicio', icon: <FaHome /> },
    { href: '/productos', label: 'Medicamentos', icon: <FaCapsules /> },
    { href: '/categorias', label: 'Categorías', icon: <FaThList /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-700 via-blue-900 to-blue-700 shadow-lg relative z-50 border-b-4 border-red-500">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-red-500 opacity-20 rounded-full blur-2xl -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <FaSpider className="text-white text-2xl drop-shadow" />
            <span className="text-white text-2xl font-extrabold tracking-tight drop-shadow flex items-center gap-1">
              Farma
              <span className="text-blue-400">Spider</span>
              <span className="text-red-500">+</span>
            </span>
          </div>
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  icon={link.icon}
                >
                  {link.label}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, icon, children }) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-base font-semibold transition-all cursor-pointer
          ${
            active
              ? 'bg-white/90 text-red-700 shadow-inner ring-2 ring-blue-400'
              : 'text-white hover:bg-blue-800/60 hover:text-red-200'
          }
        `}
        style={{
          boxShadow: active ? '0 2px 8px 0 rgba(239,68,68,0.13)' : undefined,
        }}
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}