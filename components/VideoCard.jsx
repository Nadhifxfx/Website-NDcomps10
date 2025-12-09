'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Eye, Clock } from 'lucide-react';
import { formatNumber, formatDuration, getTimeAgo } from '@/lib/youtube';

export default function VideoCard({ video, priority = false }) {
  const videoId = video.id?.videoId || video.id;
  const thumbnail = video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.medium?.url;
  const title = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const publishedAt = video.snippet?.publishedAt;
  const viewCount = video.statistics?.viewCount;
  const duration = video.contentDetails?.duration;

  return (
    <Link
      href={`/videos/${videoId}`}
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black/50">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
          </div>
        </div>

        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/90 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(duration)}
          </div>
        )}

        {viewCount && (
          <div className="absolute top-2 right-2 bg-black/90 px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {formatNumber(viewCount)}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
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
}
