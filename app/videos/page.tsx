import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoCard from '@/components/VideoCard';
import { getLatestVideos } from '@/lib/youtube';
import { Film } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: 'All Videos - NDcomps10',
  description: 'Browse all football highlights and compilations from NDcomps10'
};

export default async function VideosPage() {
  const videos = await getLatestVideos(20);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Film className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                ALL <span className="text-[#FFD700]">VIDEOS</span>
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl">
              Explore our complete collection of football highlights, skills, and epic moments. From stunning goals to incredible saves, find it all here.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="font-bold text-white">{videos.length}</span>
              <span>videos available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {videos.map((video: any, index: number) => (
              <VideoCard key={video.id?.videoId || video.id || index} video={video} priority={index < 8} />
            ))}
          </div>

          {videos.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Film className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Videos Found</h3>
              <p className="text-gray-400">Check back later for new content</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-black via-[#FFD700]/10 to-black border border-[#FFD700]/20 rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                WANT MORE CONTENT?
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Subscribe to our channel and turn on notifications to never miss an upload.
              </p>
              <a
                href="https://www.youtube.com/@NDcomps10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105"
              >
                SUBSCRIBE NOW
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
