'use client';

import { useEffect, useState } from 'react';
import { Play, TrendingUp, Youtube } from 'lucide-react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-[#FFD700]/10" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD700] rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFD700] rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex justify-center mb-6">
            <div className="">
              <Youtube className="w-12 h-12 sm:w-14 sm:h-14 text-black" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none">
            ND<span className="text-[#FFD700]">comps10</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mb-4 tracking-wide">
            Your Home of Football ⚽️
          </p>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience the beautiful game through epic moments, stunning goals, and incredible skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-2xl shadow-[#FFD700]/50"
            >
              <Youtube className="w-6 h-6" />
              SUBSCRIBE NOW
            </a>
            <a
              href="/videos"
              className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="w-6 h-6" fill="currentColor" />
              WATCH VIDEOS
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {[
              { label: 'EPIC GOALS', icon: Play },
              { label: 'SKILLS', icon: TrendingUp },
              { label: 'HIGHLIGHTS', icon: Youtube },
              { label: 'ANALYSIS', icon: Play }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#FFD700]/50 transition-all transform hover:-translate-y-1"
              >
                <item.icon className="w-6 h-6 text-[#FFD700] mx-auto mb-2" />
                <p className="text-white font-bold text-xs sm:text-sm tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
