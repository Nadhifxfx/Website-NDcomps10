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
    { href: '/playlists', label: 'PLAYLISTS' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/98 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-[#FFD700]/30">
              <Youtube className="w-7 h-7 text-black" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              ND<span className="text-[#FFD700]">comps</span>
            </span>
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-bold text-sm tracking-widest transition-colors uppercase
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
              className="bg-[#FFD700] text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-[#FFD700]/30 uppercase tracking-wider"
            >
              SUBSCRIBE
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:text-[#FFD700] transition-colors"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block font-bold text-lg tracking-widest py-3 transition-colors uppercase
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
              className="block bg-[#FFD700] text-black text-center px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all mt-6 uppercase tracking-wider"
            >
              SUBSCRIBE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
