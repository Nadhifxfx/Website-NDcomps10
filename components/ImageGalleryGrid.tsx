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

  // No filtering - show all images
  const filteredImages = images;

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
      {/* Grid 5 per Row - 1080x1080 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/50 shadow-lg">
              <div className="relative aspect-square w-full">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={1080}
                  height={1080}
                  className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
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
          <div className="w-full h-full flex flex-col justify-center items-center px-4 py-8">
            <div className="relative w-full h-[85vh] max-w-7xl bg-black rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={currentImage.src}
                alt={currentImage.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Info */}
            <div className="mt-6 text-center max-w-3xl">
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
