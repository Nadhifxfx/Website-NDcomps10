'use client';

import { Users, Eye, Video } from 'lucide-react';
import { formatNumber } from '@/lib/youtube';

export default function ChannelStats({ stats }) {
  if (!stats) return null;

  const subscribers = stats.statistics?.subscriberCount;
  const views = stats.statistics?.viewCount;
  const videos = stats.statistics?.videoCount;

  const statItems = [
    {
      icon: Users,
      label: 'SUBSCRIBERS',
      value: formatNumber(subscribers),
      color: 'text-[#FFD700]'
    },
    {
      icon: Eye,
      label: 'TOTAL VIEWS',
      value: formatNumber(views),
      color: 'text-white'
    },
    {
      icon: Video,
      label: 'VIDEOS',
      value: formatNumber(videos),
      color: 'text-white'
    }
  ];

  return (
    <div className="bg-black border border-[#FFD700]/20 rounded-2xl p-6 sm:p-8 lg:p-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">
        CHANNEL <span className="text-[#FFD700]">STATS</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD700]/50 rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-400 tracking-wider">
                  {item.label}
                </p>
              </div>
            </div>

            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
