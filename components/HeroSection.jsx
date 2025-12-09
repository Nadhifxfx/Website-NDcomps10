'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection({ channelData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Full Background Football Collage Image */}
      <div className="absolute inset-0">
        {/* Main Full Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-football-collage.jpg"
            alt="Football History Collage"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Additional Gradient Overlay from Left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        {/* Gradient from Top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

        {/* Stars/Particles Effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Subtle Glow Effect */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div
          className={`max-w-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
            THE HOME<br />
            OF <span className="text-[#FFD700]">FOOTBALL</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 font-light">
            The biggest football community in the world
          </p>

          {/* CTA Button */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-[#FFD700]/30"
            >
              Get in touch
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-[#FFD700] transition-all">
                <ArrowRight className="w-5 h-5 text-[#FFD700] group-hover:text-black" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
