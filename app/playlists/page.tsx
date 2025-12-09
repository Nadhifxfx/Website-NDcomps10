import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlaylistCard from '@/components/PlaylistCard';
import { getChannelPlaylists } from '@/lib/youtube';
import { List } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: 'Playlists - NDcomps10',
  description: 'Browse all video playlists from NDcomps10'
};

export default async function PlaylistsPage() {
  const playlists = await getChannelPlaylists(50);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                <List className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                VIDEO <span className="text-[#FFD700]">PLAYLISTS</span>
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl">
              Explore our organized collections of videos. Find playlists for different categories, series, and themes.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="font-bold text-white">{playlists.length}</span>
              <span>playlists available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {playlists.map((playlist: any, index: number) => (
              <PlaylistCard key={playlist.id || index} playlist={playlist} />
            ))}
          </div>

          {playlists.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Playlists Found</h3>
              <p className="text-gray-400">Check back later for new playlists</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
