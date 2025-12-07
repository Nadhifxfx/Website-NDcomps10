const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function getChannelStats() {
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=statistics,snippet&forUsername=${CHANNEL_ID.replace('@', '')}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      const searchResponse = await fetch(
        `${BASE_URL}/search?part=snippet&q=${CHANNEL_ID}&type=channel&key=${API_KEY}`,
        { next: { revalidate: 3600 } }
      );

      const searchData = await searchResponse.json();
      if (searchData.items && searchData.items.length > 0) {
        const channelId = searchData.items[0].snippet.channelId;
        const channelResponse = await fetch(
          `${BASE_URL}/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`,
          { next: { revalidate: 3600 } }
        );
        const channelData = await channelResponse.json();
        return channelData.items[0];
      }
    }

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return null;
  }
}

export async function getLatestVideos(maxResults = 20) {
  try {
    const channelStats = await getChannelStats();
    if (!channelStats) return [];

    const channelId = channelStats.id;

    const response = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    if (!data.items) return [];

    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videosWithStats = data.items.map(video => {
      const stats = statsData.items.find(stat => stat.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics,
        contentDetails: stats?.contentDetails
      };
    });

    return videosWithStats;
  } catch (error) {
    console.error('Error fetching latest videos:', error);
    return [];
  }
}

export async function getPopularVideos(maxResults = 12) {
  try {
    const channelStats = await getChannelStats();
    if (!channelStats) return [];

    const channelId = channelStats.id;

    const response = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=viewCount&type=video&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();

    if (!data.items) return [];

    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videosWithStats = data.items.map(video => {
      const stats = statsData.items.find(stat => stat.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics,
        contentDetails: stats?.contentDetails
      };
    });

    return videosWithStats;
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
}

export function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDuration(duration) {
  if (!duration) return '0:00';

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  if (hours) {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
}

export function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
