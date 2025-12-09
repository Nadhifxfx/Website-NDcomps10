'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, X, Eye, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatNumber, formatDuration } from '@/lib/youtube';

interface GalleryGridProps {
  items: any[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No items in gallery</p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];
  const currentVideoId = currentItem?.id?.videoId || currentItem?.id;
  const currentThumbnail = currentItem?.snippet?.thumbnails?.maxres?.url || 
                           currentItem?.snippet?.thumbnails?.high?.url || 
                           currentItem?.snippet?.thumbnails?.medium?.url;

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {items.map((item, index) => {
          const videoId = item.id?.videoId || item.id;
          const thumbnail = item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url;
          const title = item.snippet?.title || '';
          const viewCount = item.statistics?.viewCount;
          const duration = item.contentDetails?.duration;

          return (
            <div
              key={videoId || index}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl bg-black/50 shadow-lg">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={title}
                    width={400}
                    height={225}
                    className="w-full h-auto transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                )}

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight">
                      {title}
                    </h3>
                  </div>

                  {/* Play Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-7 h-7 text-black ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Badges */}
                {duration && (
                  <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(duration)}
                  </div>
                )}

                {viewCount && (
                  <div className="absolute top-2 left-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {formatNumber(viewCount)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-[#FFD700] rounded-full flex items-center justify-center text-white hover:text-black transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-[#FFD700] rounded-full flex items-center justify-center text-white hover:text-black transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="w-full max-w-6xl mx-4">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              {currentThumbnail && (
                <Image
                  src={currentThumbnail}
                  alt={currentItem?.snippet?.title || ''}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {currentItem?.snippet?.title}
              </h2>
              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                {currentItem?.statistics?.viewCount && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(currentItem.statistics.viewCount)} views</span>
                  </div>
                )}
                {currentItem?.contentDetails?.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(currentItem.contentDetails.duration)}</span>
                  </div>
                )}
              </div>
              
              <Link
                href={`/videos/${currentVideoId}`}
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 mt-4 bg-[#FFD700] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                WATCH VIDEO
              </Link>
            </div>

            {/* Counter */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
