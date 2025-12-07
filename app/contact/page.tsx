import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Mail, Youtube, MessageSquare, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact - NDcomps10',
  description: 'Get in touch with NDcomps10'
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Youtube,
      title: 'YOUTUBE',
      description: 'Follow us on YouTube',
      link: 'https://www.youtube.com/@NDcomps10',
      linkText: '@NDcomps10'
    },
    {
      icon: Mail,
      title: 'EMAIL',
      description: 'Send us an email',
      link: 'mailto:contact@ndcomps10.com',
      linkText: 'contact@ndcomps10.com'
    },
    {
      icon: MessageSquare,
      title: 'FEEDBACK',
      description: 'Share your thoughts',
      link: '#contact-form',
      linkText: 'Fill out the form'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#FFD700] rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-black" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              GET IN <span className="text-[#FFD700]">TOUCH</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-white/5 border border-white/10 hover:border-[#FFD700]/50 rounded-2xl p-8 hover:bg-white/10 transition-all transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-[#FFD700] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <method.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <p className="text-[#FFD700] font-bold text-sm">{method.linkText}</p>
              </a>
            ))}
          </div>

          <div id="contact-form" className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-black to-[#FFD700]/5 border border-[#FFD700]/20 rounded-3xl p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                SEND US A <span className="text-[#FFD700]">MESSAGE</span>
              </h2>
              <p className="text-gray-400 text-center mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <ContactForm />
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-black via-[#FFD700]/10 to-black border border-[#FFD700]/20 rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                STAY CONNECTED
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Don't miss out on the latest highlights. Subscribe to our channel and join the community.
              </p>
              <a
                href="https://www.youtube.com/@NDcomps10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105"
              >
                <Youtube className="w-6 h-6" />
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
