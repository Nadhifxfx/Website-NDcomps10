'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus('');
      }, 5000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
            YOUR NAME
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:bg-white/10 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
            YOUR EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:bg-white/10 transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-white mb-2">
          SUBJECT
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:bg-white/10 transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FFD700] focus:bg-white/10 transition-colors resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>

      {status === 'success' && (
        <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400 text-center font-bold">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#FFD700] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            SENDING...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            SEND MESSAGE
          </>
        )}
      </button>
    </form>
  );
}
