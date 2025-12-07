import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VideoSlider from '@/components/VideoSlider';
import ChannelStats from '@/components/ChannelStats';
import VideoCard from '@/components/VideoCard';
import { getLatestVideos, getChannelStats, getPopularVideos } from '@/lib/youtube';
import { Youtube, TrendingUp } from 'lucide-react';

export const revalidate = 3600;

export default async function Home() {
  const [latestVideos, channelStats, popularVideos] = await Promise.all([
    getLatestVideos(20),
    getChannelStats(),
    getPopularVideos(12)
  ]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <HeroSection />

      <main className="relative z-10">
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <VideoSlider
              videos={latestVideos.slice(0, 8)}
              title={
                <span className="flex items-center gap-3">
                  <Youtube className="w-8 h-8 text-[#FFD700]" />
                  LATEST <span className="text-[#FFD700]">VIDEOS</span>
                </span>
              }
            />
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black via-[#FFD700]/5 to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ChannelStats stats={channelStats} />
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#FFD700]" />
              MOST <span className="text-[#FFD700]">POPULAR</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {popularVideos.slice(0, 8).map((video: any, index: number) => (
                <VideoCard key={video.id?.videoId || video.id || index} video={video} priority={index < 4} />
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/videos"
                className="inline-block bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105"
              >
                VIEW ALL VIDEOS
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-black to-[#FFD700]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              SUBSCRIBE FOR MORE <span className="text-[#FFD700]">EPIC CONTENT</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of football fans and never miss a highlight. Get the latest compilations delivered straight to your feed.
            </p>
            <a
              href="https://www.youtube.com/@NDcomps10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FFD700] text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-[#FFD700]/50"
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
