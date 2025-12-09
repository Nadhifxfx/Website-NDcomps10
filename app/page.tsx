import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VideoSlider from '@/components/VideoSlider';
import VideoGallery from '@/components/VideoGallery';
import ChannelStats from '@/components/ChannelStats';
import { getLatestVideos, getChannelStats, getPopularVideos } from '@/lib/youtube';
import { Youtube, TrendingUp } from 'lucide-react';

export const revalidate = 3600;

export default async function Home() {
  const [latestResult, channelStats, popularResult] = await Promise.all([
    getLatestVideos(20),
    getChannelStats(),
    getPopularVideos(12)
  ]);

  const latestVideos = (latestResult as any).videos || [];
  const popularVideos = (popularResult as any).videos || [];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <HeroSection channelData={channelStats} />

      <main className="relative z-10">
        {/* Latest Videos Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 flex items-center gap-3">
              <Youtube className="w-10 h-10 text-[#FFD700]" />
              LATEST <span className="text-[#FFD700]">VIDEOS</span>
            </h2>
            <VideoSlider videos={latestVideos.slice(0, 12)} />
          </div>
        </section>

        {/* Video Gallery Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-black to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 flex items-center gap-3">
              <TrendingUp className="w-10 h-10 text-[#FFD700]" />
              MOST <span className="text-[#FFD700]">POPULAR</span>
            </h2>

            <VideoGallery videos={popularVideos.slice(0, 12)} columns={4} />

            <div className="text-center mt-12">
              <a
                href="/videos"
                className="inline-block bg-[#FFD700] text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-lg"
              >
                VIEW ALL VIDEOS
              </a>
            </div>
          </div>
        </section>

        {/* Channel Stats Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-[#FFD700]/5 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChannelStats stats={channelStats} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              SUBSCRIBE FOR MORE <span className="text-[#FFD700]">EPIC CONTENT</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join thousands of football fans and never miss a highlight. Get the latest compilations delivered straight to your feed.
            </p>
            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FFD700] text-black px-12 py-6 rounded-full font-bold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-[#FFD700]/50"
            >
              <Youtube className="w-8 h-8" />
              SUBSCRIBE NOW
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
