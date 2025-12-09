import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VideoGrid from '@/components/VideoGrid';
import { getPlaylistVideos, getChannelPlaylists } from '@/lib/youtube';
import { List, Video, Play } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 3600;

export default async function PlaylistDetailPage({ params }: { params: { playlistId: string } }) {
  const playlistId = params.playlistId;

  const [videos, allPlaylists] = await Promise.all([
    getPlaylistVideos(playlistId, 50),
    getChannelPlaylists(50)
  ]);

  const currentPlaylist = allPlaylists.find((p: any) => p.id === playlistId);

  if (!currentPlaylist || videos.length === 0) {
    notFound();
  }

  const thumbnail = currentPlaylist.snippet?.thumbnails?.high?.url || currentPlaylist.snippet?.thumbnails?.medium?.url;
  const title = currentPlaylist.snippet?.title || '';
  const description = currentPlaylist.snippet?.description || '';
  const itemCount = currentPlaylist.contentDetails?.itemCount || videos.length;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Playlist Header */}
          <div className="bg-gradient-to-r from-[#FFD700]/10 to-transparent border border-[#FFD700]/20 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Thumbnail */}
              <div className="lg:col-span-1">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#FFD700] rounded-full p-4">
                      <List className="w-8 h-8 text-black" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                    <Video className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">{itemCount} videos</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-[#FFD700] text-sm font-semibold mb-3">
                  <List className="w-5 h-5" />
                  <span>PLAYLIST</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h1>

                {description && (
                  <p className="text-gray-400 text-base sm:text-lg mb-6 line-clamp-3 leading-relaxed">
                    {description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={`https://www.youtube.com/playlist?list=${playlistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#FFD700] text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    PLAY ALL ON YOUTUBE
                  </a>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Video className="w-4 h-4" />
                    <span>{itemCount} videos total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Videos in Playlist */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <Video className="w-7 h-7 text-[#FFD700]" />
              VIDEOS IN THIS <span className="text-[#FFD700]">PLAYLIST</span>
            </h2>
          </div>

          <VideoGrid videos={videos} columns={4} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
