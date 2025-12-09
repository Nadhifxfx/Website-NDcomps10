# 📸 Gallery Management Guide

Halaman gallery sekarang **tidak menggunakan YouTube API** dan menggunakan gambar lokal yang Anda upload sendiri.

## 🎯 Cara Menambahkan Gambar

### 1. Upload Gambar
Letakkan gambar Anda di folder:
```
public/gallery/
```

Contoh struktur:
```
public/
  gallery/
    image-1.jpg
    image-2.jpg
    image-3.jpg
    ronaldo-goal.jpg
    messi-skill.jpg
    ...
```

### 2. Update Data Gallery
Edit file: `app/gallery/page.tsx`

Tambahkan gambar baru di array `galleryImages`:

```typescript
const galleryImages = [
  {
    id: 1,
    src: '/gallery/image-1.jpg',        // Path ke gambar
    title: 'Epic Goal Celebration',      // Judul gambar
    description: 'Amazing moment',       // Deskripsi
    category: 'Goals'                    // Kategori
  },
  {
    id: 2,
    src: '/gallery/ronaldo-goal.jpg',
    title: 'Ronaldo Free Kick',
    description: 'Unstoppable shot',
    category: 'Goals'
  },
  // Tambahkan lebih banyak...
];
```

## 📋 Kategori Yang Tersedia

Gunakan salah satu kategori ini:
- `Goals` - Gol dan tembakan
- `Skills` - Skill dan teknik
- `Highlights` - Highlight pertandingan
- `Saves` - Penyelamatan kiper
- `Team` - Foto tim
- Atau buat kategori baru sesuai keinginan

## 🎨 Fitur Gallery

### ✨ Yang Sudah Ada:
- ✅ **Filter by Category** - Filter gambar berdasarkan kategori
- ✅ **Masonry Layout** - Layout grid responsif
- ✅ **Lightbox** - Lihat gambar full screen
- ✅ **Keyboard Navigation** - Arrow keys untuk next/prev
- ✅ **Hover Effects** - Animasi smooth saat hover
- ✅ **Image Counter** - Menampilkan posisi gambar (1/10, dll)

### 🎹 Keyboard Controls:
- `Arrow Left` - Previous image
- `Arrow Right` - Next image  
- `Escape` - Close lightbox

## 📐 Rekomendasi Gambar

### Format:
- JPG, PNG, atau WebP
- Aspect ratio: 16:9 atau 4:3
- Resolusi: 1920x1080px atau lebih tinggi

### Ukuran File:
- Maksimal 2MB per gambar
- Compress jika perlu untuk loading lebih cepat

### Tools Compress:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [ImageOptim](https://imageoptim.com/)

## 🚀 Quick Start

### Step 1: Siapkan Gambar
```bash
# Copy gambar Anda ke folder gallery
cp your-image.jpg public/gallery/
```

### Step 2: Edit Gallery Data
Buka `app/gallery/page.tsx` dan tambah:
```typescript
{
  id: 7,
  src: '/gallery/your-image.jpg',
  title: 'Your Photo Title',
  description: 'Your description',
  category: 'Goals'
}
```

### Step 3: Refresh Browser
Gallery akan otomatis update!

## 🔧 Customization

### Tambah Kategori Baru:
Edit kategori di `app/gallery/page.tsx`:
```typescript
{
  id: 1,
  src: '/gallery/training.jpg',
  title: 'Training Session',
  description: 'Hard work pays off',
  category: 'Training'  // Kategori baru!
}
```

### Ubah Layout Columns:
Edit di `components/ImageGalleryGrid.tsx`:
```typescript
// Dari:
className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4"

// Ke (lebih banyak kolom):
className="columns-1 sm:columns-2 lg:columns-4 xl:columns-5"
```

## 📝 Example Gallery Data

```typescript
const galleryImages = [
  {
    id: 1,
    src: '/gallery/ronaldo-freekick.jpg',
    title: 'Cristiano Ronaldo Free Kick',
    description: 'Unstoppable shot from 30 yards',
    category: 'Goals'
  },
  {
    id: 2,
    src: '/gallery/messi-dribble.jpg',
    title: 'Messi Magic',
    description: 'Dribbling past 5 defenders',
    category: 'Skills'
  },
  {
    id: 3,
    src: '/gallery/neuer-save.jpg',
    title: 'Neuer Incredible Save',
    description: 'World class reflexes',
    category: 'Saves'
  },
  {
    id: 4,
    src: '/gallery/team-celebration.jpg',
    title: 'Championship Victory',
    description: 'Team celebrating the title',
    category: 'Team'
  },
];
```

## 🎯 Tips

1. **Naming Convention**: Gunakan nama file yang deskriptif
   - ✅ `ronaldo-goal-ucl-2023.jpg`
   - ❌ `IMG_1234.jpg`

2. **Organization**: Susun kategori dengan baik
   - Goals, Skills, Highlights, Saves, Team

3. **Quality**: Gunakan gambar berkualitas tinggi
   - Minimal 1920x1080px
   - Compress untuk web

4. **Backup**: Simpan copy gambar original
   - Sebelum di-compress/edit

## 🐛 Troubleshooting

### Gambar tidak muncul?
- Pastikan file ada di `public/gallery/`
- Check path: `/gallery/image-name.jpg` (dengan slash di depan)
- Nama file case-sensitive

### Layout berantakan?
- Pastikan semua gambar punya aspect ratio similar
- Gunakan image editor untuk resize

### Loading lambat?
- Compress gambar Anda
- Kurangi resolusi jika terlalu besar
- Convert ke WebP format

## 🎉 Done!

Gallery sekarang fully customizable dan tidak depend pada YouTube API. Anda bisa upload dan manage gambar sendiri dengan mudah!
