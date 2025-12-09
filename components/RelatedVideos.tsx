'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye } from 'lucide-react';
import { formatNumber, formatDuration, getTimeAgo } from '@/lib/youtube';

interface RelatedVideosProps {
  videos: any[];
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
        Related Videos
      </h2>

      <div className="space-y-3">
        {videos.map((video, index) => {
          const videoId = video.id?.videoId || video.id;
          const thumbnail = video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.high?.url;
          const title = video.snippet?.title || '';
          const duration = formatDuration(video.contentDetails?.duration);
          const views = formatNumber(video.statistics?.viewCount);
          const publishedAt = getTimeAgo(video.snippet?.publishedAt);

          return (
            <Link
              key={videoId || index}
              href={`/videos/${videoId}`}
              className="flex gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg overflow-hidden transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative w-40 h-24 flex-shrink-0">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                )}
                
                {duration && (
                  <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
                    {duration}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-2 min-w-0">
                <h3 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-[#FFD700] transition-colors leading-tight mb-1">
                  {title}
                </h3>
                
                <div className="flex flex-col gap-1 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{views} views</span>
                  </div>
                  <span>{publishedAt}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
