'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 transform transition-transform group-hover:scale-110 shadow-lg">
              <Image
                src="/ndcomps-logo.png"
                alt="NDcomps10 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ND<span className="text-[#FFD700]">comps</span>10
            </span>
          </Link>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
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
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`lg:hidden bg-black border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block font-bold text-base sm:text-lg tracking-wider py-3 px-4 rounded-lg transition-all uppercase
                  ${isActive 
                    ? 'text-[#FFD700] bg-[#FFD700]/10' 
                    : 'text-white hover:text-[#FFD700] hover:bg-white/5 active:bg-white/10'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
