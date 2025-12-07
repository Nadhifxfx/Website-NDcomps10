import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChannelStats from '@/components/ChannelStats';
import { getChannelStats } from '@/lib/youtube';
import { Target, Heart, Zap, Users, Trophy, Star } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: 'About - NDcomps10',
  description: 'Learn more about NDcomps10 - Your source for football highlights and compilations'
};

export default async function AboutPage() {
  const channelStats = await getChannelStats();

  const features = [
    {
      icon: Zap,
      title: 'EPIC HIGHLIGHTS',
      description: 'Curated collections of the most electrifying moments in football'
    },
    {
      icon: Trophy,
      title: 'QUALITY CONTENT',
      description: 'Professional editing and production for the ultimate viewing experience'
    },
    {
      icon: Star,
      title: 'DAILY UPLOADS',
      description: 'Fresh content regularly to keep you entertained'
    },
    {
      icon: Heart,
      title: 'FAN FOCUSED',
      description: 'Created by fans, for fans who live and breathe football'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'OUR MISSION',
      content: 'To bring the beautiful game to life through captivating compilations that celebrate skill, passion, and the magic of football.'
    },
    {
      icon: Users,
      title: 'OUR COMMUNITY',
      content: 'Join thousands of football enthusiasts who share our passion for the game and appreciation for extraordinary talent.'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              ABOUT <span className="text-[#FFD700]">NDcomps10</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Your premier destination for football compilations, highlights, and unforgettable moments that define the beautiful game.
            </p>
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="bg-gradient-to-br from-[#FFD700]/10 via-black to-black border border-[#FFD700]/20 rounded-3xl p-8 sm:p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    THE <span className="text-[#FFD700]">STORY</span>
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      NDcomps10 was born from a deep passion for football and a desire to capture and share the moments that make this sport truly special.
                    </p>
                    <p>
                      Every compilation is crafted with attention to detail, showcasing the skills, goals, and plays that leave fans in awe. From legendary players to rising stars, we cover it all.
                    </p>
                    <p>
                      Our channel has grown into a community of football lovers who appreciate the artistry and excitement that only this game can deliver.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-[#FFD700] to-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 text-center p-8">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-[#FFD700]" fill="currentColor" />
                      </div>
                      <p className="text-2xl font-bold text-white">
                        PASSION<br />FOR THE GAME
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              WHAT WE <span className="text-[#FFD700]">OFFER</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-[#FFD700]/50 rounded-xl p-6 hover:bg-white/10 transition-all transform hover:-translate-y-2"
                >
                  <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16 sm:mb-20">
            <ChannelStats stats={channelStats} />
          </div>

          <div className="mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-black to-[#FFD700]/5 border border-[#FFD700]/20 rounded-2xl p-8 sm:p-10"
                >
                  <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-black rounded-3xl p-12 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                JOIN THE COMMUNITY
              </h2>
              <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
                Become part of our growing family and experience football like never before.
              </p>
              <a
                href="https://www.youtube.com/@NDcomps10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-[#FFD700] px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                SUBSCRIBE NOW
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
