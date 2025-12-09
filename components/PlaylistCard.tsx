'use client';

import Link from 'next/link';
import Image from 'next/image';
import { List, Video } from 'lucide-react';

interface PlaylistCardProps {
  playlist: any;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const playlistId = playlist.id;
  const thumbnail = playlist.snippet?.thumbnails?.high?.url || playlist.snippet?.thumbnails?.medium?.url;
  const title = playlist.snippet?.title || '';
  const description = playlist.snippet?.description || '';
  const itemCount = playlist.contentDetails?.itemCount || 0;

  return (
    <Link
      href={`/playlists/${playlistId}`}
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

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />

        {/* Playlist Icon Overlay */}
        <div className="absolute top-0 right-0 bg-black/90 backdrop-blur-sm rounded-bl-xl px-3 py-2">
          <div className="flex items-center gap-2 text-white">
            <List className="w-4 h-4" />
            <span className="text-sm font-bold">{itemCount} videos</span>
          </div>
        </div>

        {/* Play All Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-[#FFD700] rounded-full px-6 py-3 flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform">
            <Video className="w-5 h-5 text-black" />
            <span className="text-black font-bold">PLAY ALL</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-2">
        <h3 className="font-bold text-white text-sm sm:text-base line-clamp-2 group-hover:text-[#FFD700] transition-colors leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Video className="w-3 h-3" />
          <span>{itemCount} videos in playlist</span>
        </div>
      </div>
    </Link>
  );
}
