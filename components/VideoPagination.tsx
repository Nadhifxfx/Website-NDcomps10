'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import VideoGrid from './VideoGrid';
import Pagination from './Pagination';

interface VideoPaginationProps {
  videos: any[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export default function VideoPagination({
  videos,
  currentPage,
  itemsPerPage,
  totalItems
}: VideoPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate pagination
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVideos = videos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/videos?${params.toString()}`);
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (items: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('perPage', items.toString());
    params.set('page', '1'); // Reset to first page
    router.push(`/videos?${params.toString()}`);
  };

  return (
    <>
      {/* Video Grid */}
      <VideoGrid videos={paginatedVideos} columns={4} />

      {/* Pagination Controls */}
      {videos.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={videos.length}
        />
      )}
    </>
  );
}
