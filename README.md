# NDcomps10 - YouTube Channel Website

🎬 Website profil modern dan lengkap untuk channel YouTube **NDcomps10** dengan integrasi YouTube Data API v3. Website ini dibangun dengan Next.js 13, TailwindCSS, dan fitur-fitur canggih seperti search, filter, playlist system, dan gallery dengan lightbox.

## ✨ Features Lengkap

### 🏠 Home Page
- **Hero Section** dengan channel profile, banner, subscriber & video count
- **Latest Video Slider** horizontal scroll dengan touch support
- **Popular Videos Grid** dengan hover effects
- **Channel Statistics** dinamis dari YouTube API

### 🎥 Video Features
- **Video Detail Page** - Mini YouTube player dengan:
  - Embedded YouTube player
  - View count, like count, publish date
  - Expandable description
  - Related videos sidebar
  - Channel information
  
- **Video Grid** dengan masonry layout
- **Search & Filter System**:
  - Search by keyword
  - Sort: Latest, Most Viewed, Top Rated
  - Filter by duration: Any, Shorts (<4min), Medium (4-20min), Long (>20min)
  - Kombinasi multiple filters

### 📋 Playlist System
- **Playlist Grid** menampilkan semua playlist
- **Playlist Detail Page** dengan video list
- Video count per playlist
- Play All on YouTube button

### 🖼️ Gallery Page
- **Masonry Grid Layout** responsive
- **Lightbox Feature**:
  - Full-screen image viewer
  - Next/Previous navigation
  - Keyboard navigation (Arrow keys, Escape)
  - Image counter
  - Watch Video CTA

### 🔍 Search & Navigation
- Live search functionality
- Filter combinations
- Smooth page transitions
- Responsive navbar
- Breadcrumb navigation

### 📱 Responsive Design
- Mobile-first approach
- Touch gesture support
- Adaptive layouts untuk semua screen sizes
- Optimized untuk: Mobile, Tablet, Desktop, Large screens

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript + JavaScript
- **Styling**: TailwindCSS + Custom CSS
- **API**: YouTube Data API v3
- **Icons**: Lucide React
- **UI Components**: shadcn/ui + Custom Components
- **Image Optimization**: Next.js Image
- **State Management**: React Hooks

## 📦 API Endpoints

Website ini menyediakan API routes untuk akses data:

```
GET /api/videos?type=latest&maxResults=20
GET /api/videos?type=popular&maxResults=20
GET /api/videos?type=shorts&maxResults=20
GET /api/videos/[videoId]
GET /api/playlists?maxResults=50
GET /api/playlists/[playlistId]?maxResults=50
GET /api/search?q=keyword&order=viewCount&duration=any
GET /api/channel
```

## 📄 Available Pages

1. **/** - Home (Hero + Latest Videos + Popular)
2. **/videos** - All videos dengan search & filter
3. **/videos/[videoId]** - Video detail dengan player & related videos
4. **/playlists** - All playlists grid
5. **/playlists/[playlistId]** - Playlist detail dengan video list
6. **/gallery** - Gallery dengan masonry layout & lightbox
7. **/about** - About channel page
8. **/contact** - Contact form page

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup YouTube API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Enable **YouTube Data API v3**
4. Buat API Key di menu "Credentials"
5. Copy API key yang sudah dibuat

### 3. Configure Environment Variables

Edit file `.env.local` di root project dan isi dengan API key Anda:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@NDcomps10
```

**PENTING**: Ganti `YOUR_API_KEY_HERE` dengan YouTube API key yang sudah Anda dapatkan.

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── videos/page.tsx       # Videos page
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.jsx            # Navigation bar
│   ├── Footer.jsx            # Footer
│   ├── HeroSection.jsx       # Hero section
│   ├── VideoCard.jsx         # Video card component
│   ├── VideoSlider.jsx       # Horizontal video slider
│   ├── ChannelStats.jsx      # Channel statistics
│   └── ContactForm.jsx       # Contact form
├── lib/
│   └── youtube.js            # YouTube API functions
└── types/
    └── youtube.ts            # TypeScript types
```

## YouTube API Functions

### `getChannelStats()`
Mengambil statistik channel (subscribers, views, video count)

### `getLatestVideos(maxResults)`
Mengambil video terbaru dari channel (default: 20 video)

### `getPopularVideos(maxResults)`
Mengambil video paling populer berdasarkan views (default: 12 video)

## Responsive Breakpoints

- **Mobile**: 0-640px (sm:)
- **Tablet**: 641-1024px (md:)
- **Desktop**: 1025px+ (lg:, xl:)

### Mobile (0-640px)
- Navbar dengan hamburger menu
- Hero section centered
- Video slider: 1 kartu per view
- Video grid: 1 kolom
- Footer: vertical layout

### Tablet (641-1024px)
- Navbar full (no collapse)
- Video slider: 2-3 kartu per view
- Video grid: 2 kolom
- Hover effects aktif

### Desktop (1025px+)
- Video slider: 3-4 kartu per view
- Video grid: 3-4 kolom
- Full animasi dan hover effects
- Auto-scroll slider dengan drag

## Customization

### Colors
Warna utama dapat diubah di `app/globals.css`:

```css
:root {
  --gold: #FFD700;  /* Kuning emas */
}
```

Atau langsung di TailwindCSS dengan class `[#FFD700]`

### Channel ID
Ubah channel ID di `.env.local`:

```env
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@YourChannelHandle
```

### API Revalidation
Ubah waktu revalidasi (dalam detik) di setiap page:

```typescript
export const revalidate = 3600; // 1 jam
```

## Performance Tips

1. **Caching**: Data YouTube di-cache selama 1 jam (revalidate: 3600)
2. **Image Optimization**: Gunakan Next.js Image component
3. **Lazy Loading**: Video thumbnails di-lazy load otomatis
4. **Static Generation**: Semua halaman di-generate secara static

## API Limits

YouTube Data API v3 memiliki quota limit:
- **Free tier**: 10,000 units/hari
- **Read operations**: ~1 unit per request
- **Estimated requests/day**: ~1,000-2,000 dengan current setup

Untuk production, pertimbangkan:
- Tingkatkan revalidasi time (misalnya 7200 detik = 2 jam)
- Implementasi caching layer tambahan
- Request API key dengan quota lebih tinggi

## Troubleshooting

### API Key Error
Pastikan API key sudah benar dan YouTube Data API v3 sudah di-enable di Google Cloud Console.

### Channel Not Found
Pastikan Channel ID format benar (@username atau channel ID).

### Build Warnings
Warning metadata.metadataBase dan browserslist bisa diabaikan untuk development.

## License

This project is created for NDcomps10 channel.

## Support

Untuk pertanyaan atau issue, hubungi melalui:
- YouTube: [@NDcomps10](https://www.youtube.com/@NDcomps10)
- Website: Contact page

---

**Made with passion for the beautiful game ⚽**
