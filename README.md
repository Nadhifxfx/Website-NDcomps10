# NDcomps10 - Football Highlights Website

Website profil modern untuk channel YouTube NDcomps10 dengan desain bergaya 433football.com. Dibangun dengan Next.js 13, TailwindCSS, dan integrasi YouTube Data API v3.

## Features

- **Modern Design**: Bold, clean, dan sporty design dengan tema hitam, putih, dan kuning emas
- **Fully Responsive**: Mobile-first design yang sempurna di semua ukuran layar
- **YouTube Integration**: Menampilkan video terbaru, populer, dan statistik channel secara dinamis
- **Video Slider**: Horizontal scroll slider dengan drag support
- **Channel Stats**: Menampilkan subscribers, views, dan total video
- **SEO Optimized**: Meta tags dan OpenGraph untuk SEO yang baik
- **Fast Performance**: Static generation dengan revalidasi otomatis

## Pages

1. **Home** - Hero section, video slider, channel stats, dan popular videos
2. **Videos** - Grid layout menampilkan semua video dari channel
3. **About** - Informasi tentang channel dan misi
4. **Contact** - Form kontak dan informasi channel

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- TailwindCSS
- YouTube Data API v3
- Lucide React (Icons)
- shadcn/ui components

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
