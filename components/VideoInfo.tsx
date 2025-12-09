'use client';

import { useState } from 'react';
import { ThumbsUp, Eye, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { formatNumber, getTimeAgo } from '@/lib/youtube';

interface VideoInfoProps {
  video: any;
}

export default function VideoInfo({ video }: VideoInfoProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { snippet, statistics } = video;
  const description = snippet?.description || '';
  const shortDescription = description.substring(0, 200);
  const hasMoreDescription = description.length > 200;

  return (
    <div className="mt-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
        {snippet.title}
      </h1>

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#FFD700]" />
          <span className="text-white font-semibold">{formatNumber(statistics?.viewCount)}</span>
          <span className="text-sm">views</span>
        </div>

        <div className="flex items-center gap-2">
          <ThumbsUp className="w-5 h-5 text-[#FFD700]" />
          <span className="text-white font-semibold">{formatNumber(statistics?.likeCount)}</span>
          <span className="text-sm">likes</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#FFD700]" />
          <span className="text-sm">{getTimeAgo(snippet.publishedAt)}</span>
        </div>
      </div>

      {/* Description Box */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg font-bold text-white mb-3">Description</h2>
        
        <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {isDescriptionExpanded ? description : shortDescription}
          {!isDescriptionExpanded && hasMoreDescription && '...'}
        </div>

        {hasMoreDescription && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="mt-4 flex items-center gap-2 text-[#FFD700] hover:text-white transition-colors font-semibold"
          >
            {isDescriptionExpanded ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Show More
              </>
            )}
          </button>
        )}
      </div>

      {/* Channel Info */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-xl">
              {snippet.channelTitle.charAt(0)}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{snippet.channelTitle}</h3>
              <p className="text-gray-400 text-sm">Content Creator</p>
            </div>
          </div>

          <a
            href={`https://www.youtube.com/channel/${video.snippet.channelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FFD700] text-black px-6 py-2 rounded-full font-bold hover:bg-white transition-all"
          >
            Visit Channel
          </a>
        </div>
      </div>
    </div>
  );
}
