'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Eye, Clock } from 'lucide-react';
import { formatNumber, formatDuration, getTimeAgo } from '@/lib/youtube';

interface VideoGridProps {
  videos: any[];
  columns?: number;
}

export default function VideoGrid({ videos, columns = 4 }: VideoGridProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No videos found</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${columns === 4 ? 'xl:grid-cols-4' : ''} gap-4 sm:gap-6`}>
      {videos.map((video, index) => {
        const videoId = video.id?.videoId || video.id;
        const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url;
        const title = video.snippet?.title || '';
        const channelTitle = video.snippet?.channelTitle || '';
        const publishedAt = video.snippet?.publishedAt;
        const viewCount = video.statistics?.viewCount;
        const duration = video.contentDetails?.duration;

        return (
          <Link
            key={videoId || index}
            href={`/videos/${videoId}`}
            className="group block"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black/50 shadow-lg">
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-tight">
                    {title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-1">{channelTitle}</p>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Duration Badge */}
              {duration && (
                <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(duration)}
                </div>
              )}

              {/* View Count Badge */}
              {viewCount && (
                <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatNumber(viewCount)}
                </div>
              )}
            </div>

            {/* Info below thumbnail (visible always) */}
            <div className="mt-3 space-y-1 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2 group-hover:text-[#FFD700] transition-colors leading-tight">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>{channelTitle}</span>
                {publishedAt && (
                  <>
                    <span>•</span>
                    <span>{getTimeAgo(publishedAt)}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
