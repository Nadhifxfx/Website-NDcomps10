import Link from 'next/link';
import { Youtube, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-[#FFD700]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              ND<span className="text-[#FFD700]">comps10</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate destination for football compilations, highlights, and epic moments.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@NDcomps10"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center hover:bg-white transition-colors group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-black" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFD700]">NAVIGATE</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFD700]">CATEGORIES</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Skills & Goals
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Match Highlights
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Best Moments
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Player Analysis
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#FFD700]">SUBSCRIBE</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest highlights delivered to your feed.
            </p>
            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors"
            >
              SUBSCRIBE NOW
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {currentYear} NDcomps10. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
