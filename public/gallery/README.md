# Gallery Images

Place your gallery images in this folder with the following naming:
- image-1.jpg
- image-2.jpg
- image-3.jpg
- etc.

## ⚠️ IMPORTANT - Image Specifications:
- **Format:** JPG, PNG, or WebP
- **Size:** 1080x1080 pixels (SQUARE/PERSEGI) ⚠️ WAJIB!
- **Aspect Ratio:** 1:1 (mandatory)
- **File size:** Under 2MB for optimal loading
- **Quality:** High quality for best display

## 📐 Cara Resize Foto Ke 1080x1080:
1. Gunakan Photoshop, GIMP, Canva, atau online tool (iloveimg.com)
2. Crop foto menjadi square/persegi (1:1)
3. Resize ke exactly 1080x1080 pixels
4. Save as JPG (quality 85-90%)

## How to Add Images:
1. Place your images in this folder
2. Name them sequentially (image-1.jpg, image-2.jpg, etc.)
3. Update the gallery data in `app/gallery/page.tsx`

## Example:
```typescript
{
  id: 1,
  src: '/gallery/image-1.jpg',
  title: 'Your Photo Title',
  description: 'Photo description',
  category: 'Goals' // or 'Skills', 'Highlights', 'Team', etc.
}
```

## Categories Available:
- Goals
- Skills
- Highlights
- Saves
- Team
- Training
- Match Day
- Celebrations
- (Add your own categories)
