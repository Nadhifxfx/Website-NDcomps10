# Gallery Images

Place your gallery images in this folder with the following naming:
- image-1.jpg
- image-2.jpg
- image-3.jpg
- etc.

## Recommended Image Specifications:
- Format: JPG, PNG, or WebP
- Size: 1920x1080px or similar aspect ratios
- File size: Under 2MB for optimal loading
- Quality: High quality for best display

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
