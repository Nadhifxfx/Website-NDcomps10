import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import VideoInfo from '@/components/VideoInfo';
import RelatedVideos from '@/components/RelatedVideos';
import { getVideoDetails, getRelatedVideos } from '@/lib/youtube';

export const revalidate = 3600;

export default async function VideoDetailPage({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;

  const [videoDetails, relatedVideos] = await Promise.all([
    getVideoDetails(videoId),
    getRelatedVideos(videoId, 12)
  ]);

  if (!videoDetails) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            <VideoPlayer videoId={videoId} title={videoDetails.snippet.title} />
            <VideoInfo video={videoDetails} />
          </div>

          {/* Related Videos Sidebar */}
          <div className="lg:col-span-1">
            <RelatedVideos videos={relatedVideos} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
