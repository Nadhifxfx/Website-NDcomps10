import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NDcomps10 - Football Highlights & Compilations',
  description: 'Experience the beautiful game through epic moments, stunning goals, and incredible skills. The ultimate destination for football compilations.',
  keywords: ['football', 'highlights', 'compilations', 'soccer', 'goals', 'skills', 'NDcomps10'],
  authors: [{ name: 'NDcomps10' }],
  openGraph: {
    title: 'NDcomps10 - Football Highlights & Compilations',
    description: 'Experience the beautiful game through epic moments, stunning goals, and incredible skills.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
