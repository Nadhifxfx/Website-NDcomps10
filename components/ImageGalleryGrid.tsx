'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
}

interface ImageGalleryGridProps {
  images: GalleryImage[];
}

export default function ImageGalleryGrid({ images }: ImageGalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No images in gallery yet</p>
        <p className="text-gray-500 text-sm mt-2">Add images to the /public/gallery folder</p>
      </div>
    );
  }

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

  // Filter images by category
  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
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

  const currentImage = filteredImages[currentIndex];

  return (
    <>
      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              selectedCategory === category
                ? 'bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/30'
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="break-inside-avoid group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/50 shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-tight mb-1">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-xs">{image.description}</p>
                </div>

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-7 h-7 text-black" />
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#FFD700]">
                {image.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          {filteredImages.length > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-[#FFD700] rounded-full flex items-center justify-center text-white hover:text-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {filteredImages.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 bg-white/10 hover:bg-[#FFD700] rounded-full flex items-center justify-center text-white hover:text-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Content */}
          <div className="w-full max-w-6xl mx-4">
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Info */}
            <div className="mt-6 text-center">
              <div className="inline-block bg-[#FFD700]/20 backdrop-blur-sm border border-[#FFD700]/30 px-4 py-1 rounded-full text-[#FFD700] text-sm font-bold mb-3">
                {currentImage.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {currentImage.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {currentImage.description}
              </p>
            </div>

            {/* Counter */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
