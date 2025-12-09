'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Eye, Clock } from 'lucide-react';
import { formatNumber, formatDuration } from '@/lib/youtube';

interface VideoGalleryProps {
  videos: any[];
  columns?: 3 | 4;
}

export default function VideoGallery({ videos, columns = 4 }: VideoGalleryProps) {
  if (!videos || videos.length === 0) {
    return null;
  }

  const gridClass = columns === 3 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6';

  return (
    <div className={gridClass}>
      {videos.map((video, index) => {
        const videoId = video.id?.videoId || video.id;
        const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url;
        const title = video.snippet?.title || '';
        const viewCount = video.statistics?.viewCount;
        const duration = video.contentDetails?.duration;

        return (
          <Link
            key={videoId || index}
            href={`/videos/${videoId}`}
            className="group block"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/50 shadow-lg">
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 4}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform shadow-2xl">
                  <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Duration Badge */}
              {duration && (
                <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(duration)}
                </div>
              )}

              {/* View Count Badge */}
              {viewCount && (
                <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {formatNumber(viewCount)}
                </div>
              )}

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-tight">
                  {title}
                </h3>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
