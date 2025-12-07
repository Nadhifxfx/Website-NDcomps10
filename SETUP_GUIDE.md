# Quick Setup Guide - NDcomps10 Website

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Dapatkan YouTube API Key

1. Buka https://console.cloud.google.com/
2. Buat project baru (atau pilih yang sudah ada)
3. Klik menu "APIs & Services" > "Enable APIs and Services"
4. Cari dan enable "YouTube Data API v3"
5. Klik "Credentials" di sidebar kiri
6. Klik "Create Credentials" > "API Key"
7. Copy API key yang muncul

## Step 3: Setup API Key di Project

Edit file `.env.local` yang sudah ada di root project:

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=PASTE_YOUR_API_KEY_HERE
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@NDcomps10
```

**GANTI** `PASTE_YOUR_API_KEY_HERE` dengan API key yang baru saja Anda copy.

## Step 4: Jalankan Development Server

```bash
npm run dev
```

Buka http://localhost:3000 di browser.

Website akan otomatis menampilkan video dan statistik dari channel @NDcomps10!

## Build untuk Production

```bash
npm run build
npm start
```

## Troubleshooting

**Q: Muncul error "API key not valid"**
A: Pastikan API key sudah benar dan YouTube Data API v3 sudah di-enable.

**Q: Video tidak muncul**
A: Tunggu beberapa saat, lalu refresh halaman. Pastikan channel @NDcomps10 ada video publiknya.

**Q: Error saat build**
A: Error YouTube API saat build itu normal jika API key belum diisi. Setelah API key diisi, jalankan `npm run build` lagi.

## Fitur Website

### Home Page
- Hero section dengan animasi
- Slider video terbaru (horizontal scroll + drag)
- Statistik channel (subscribers, views, videos)
- Grid video populer

### Videos Page
- Semua video dari channel dalam grid layout
- Filter dan search (coming soon)
- Responsive di semua device

### About Page
- Informasi channel
- Misi dan visi
- Statistik channel

### Contact Page
- Form kontak
- Link ke social media
- Info channel

## Responsiveness

Website sudah 100% responsive:
- **Mobile** (0-640px): Hamburger menu, 1 kolom grid
- **Tablet** (641-1024px): 2 kolom grid
- **Desktop** (1025px+): 3-4 kolom grid dengan full animasi

## Customization

### Ganti Warna
Edit file `app/globals.css` untuk ganti warna emas:

```css
:root {
  --gold: #FFD700;  /* Ganti dengan warna favorit */
}
```

Atau gunakan class TailwindCSS dengan warna custom:
- `bg-[#YOUR_COLOR]`
- `text-[#YOUR_COLOR]`
- `border-[#YOUR_COLOR]`

### Ganti Channel
Edit `.env.local`:

```env
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@YourChannelName
```

Ganti `@YourChannelName` dengan handle channel YouTube Anda.

## Need Help?

Check README.md untuk dokumentasi lengkap!
