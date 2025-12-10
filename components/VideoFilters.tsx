'use client';

import { useState, useTransition } from 'react';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface VideoFiltersProps {
  totalVideos: number;
}

export default function VideoFilters({ totalVideos }: VideoFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  const currentOrder = searchParams.get('order') || 'date';
  const currentDuration = searchParams.get('duration') || 'any';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchQuery });
  };

  const updateFilters = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'any' && value !== '') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Reset to page 1 when filters change
    newParams.delete('page');

    startTransition(() => {
      router.push(`/videos?${newParams.toString()}`);
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    updateFilters({ q: '' });
  };

  const orderOptions = [
    { value: 'date', label: 'Latest' },
    { value: 'viewCount', label: 'Most Viewed' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const durationOptions = [
    { value: 'any', label: 'Any Duration' },
    { value: 'short', label: 'Shorts (< 4 min)' },
    { value: 'medium', label: 'Medium (4-20 min)' },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-24 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#FFD700]/50 focus:bg-white/10 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFD700] text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-all disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
          </button>
        </div>
      </form>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white hover:bg-white/10 transition-all"
        >
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filters</span>
        </button>

        <div className="text-sm text-gray-400">
          <span className="font-bold text-white">{totalVideos}</span> videos found
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 space-y-4">
          {/* Order Filter */}
          <div>
            <label className="block text-white font-semibold mb-2">Sort By</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {orderOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilters({ order: option.value })}
                  disabled={isPending}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentOrder === option.value
                      ? 'bg-[#FFD700] text-black'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-white font-semibold mb-2">Duration</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilters({ duration: option.value })}
                  disabled={isPending}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentDuration === option.value
                      ? 'bg-[#FFD700] text-black'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All Filters */}
          {(searchQuery || currentOrder !== 'date' || currentDuration !== 'any') && (
            <button
              onClick={() => {
                setSearchQuery('');
                router.push('/videos');
              }}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
