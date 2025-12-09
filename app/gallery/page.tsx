import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageGalleryGrid from '@/components/ImageGalleryGrid';
import { Images } from 'lucide-react';

export const metadata = {
  title: 'Gallery - NDcomps10',
  description: 'Browse our collection of football photos and moments'
};

// Data gallery - ganti dengan gambar Anda sendiri di folder public/gallery
// Untuk menambah gambar: letakkan file JPG/PNG di public/gallery/ dan update array ini
const galleryImages = [
  {
    id: 1,
    src: '/gallery/image-1.svg', // Ganti .svg dengan .jpg setelah upload gambar Anda
    title: 'Epic Goal Celebration',
    description: 'Amazing moment captured',
    category: 'Goals'
  },
  {
    id: 2,
    src: '/gallery/image-2.svg',
    title: 'Skillful Dribble',
    description: 'Technical excellence',
    category: 'Skills'
  },
  {
    id: 3,
    src: '/gallery/image-3.svg',
    title: 'Team Victory',
    description: 'Champions moment',
    category: 'Highlights'
  },
  {
    id: 4,
    src: '/gallery/image-4.svg',
    title: 'Goalkeeper Save',
    description: 'Incredible reflexes',
    category: 'Saves'
  },
  {
    id: 5,
    src: '/gallery/image-5.svg',
    title: 'Free Kick Master',
    description: 'Perfect technique',
    category: 'Goals'
  },
  {
    id: 6,
    src: '/gallery/image-6.svg',
    title: 'Team Huddle',
    description: 'Unity and spirit',
    category: 'Team'
  },
  // Tambahkan lebih banyak gambar dengan format:
  // {
  //   id: 7,
  //   src: '/gallery/your-image.jpg',
  //   title: 'Judul Gambar',
  //   description: 'Deskripsi gambar',
  //   category: 'Goals' // atau 'Skills', 'Highlights', 'Saves', 'Team'
  // },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Images className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                MEDIA <span className="text-[#FFD700]">GALLERY</span>
              </h1>
            </div>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl">
              Explore our visual collection of epic football moments, stunning goals, and memorable highlights.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="font-bold text-white">{galleryImages.length}</span>
              <span>photos in gallery</span>
            </div>
          </div>

          <ImageGalleryGrid images={galleryImages} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
