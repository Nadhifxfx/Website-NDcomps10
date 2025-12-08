'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Youtube } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // ➜ menangkap route yang sedang aktif

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/videos', label: 'VIDEOS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#FFD700]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD700] rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
              <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              ND<span className="text-[#FFD700]">comps10</span>
            </span>
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href; // cek halaman aktif

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-bold text-sm tracking-wider transition-colors
                    ${isActive ? 'text-[#FFD700]' : 'text-white hover:text-[#FFD700]'}`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#FFD700] transition-all
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              );
            })}

            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors"
            >
              SUBSCRIBE
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:text-[#FFD700] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-[#FFD700]/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-bold text-lg tracking-wider py-2 transition-colors
                    ${isActive ? 'text-[#FFD700]' : 'text-white hover:text-[#FFD700]'}`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#FFD700] text-black text-center px-6 py-3 rounded-full font-bold text-lg hover:bg-white transition-colors mt-4"
            >
              SUBSCRIBE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
