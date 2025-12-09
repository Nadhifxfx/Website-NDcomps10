const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID; // langsung ID: UCxYaWCWyJWiEB5CU1epTmcg
const BASE_URL = "https://www.googleapis.com/youtube/v3";

/* ---------------------------------------------------------
   FIX 1: Ambil channel berdasarkan ID saja (bukan username)
   Cegah error items undefined
--------------------------------------------------------- */
export async function getChannelStats() {
  try {
    const res = await fetch(
      `${BASE_URL}/channels?part=statistics,snippet,brandingSettings&id=${CHANNEL_ID}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      console.error("Channel stats not found:", data);
      return null;
    }

    return data.items[0];
  } catch (err) {
    console.error("Error fetching channel stats:", err);
    return null;
  }
}

/* ---------------------------------------------------------
   FIX 2: Ambil video terbaru (aman dari error) + PAGINATION
--------------------------------------------------------- */
export async function getLatestVideos(maxResults = 50, pageToken = '') {
  try {
    const channelStats = await getChannelStats();
    if (!channelStats) return { videos: [], nextPageToken: null, totalResults: 0 };

    let url = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=${maxResults}&key=${API_KEY}`;
    if (pageToken) url += `&pageToken=${pageToken}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return { videos: [], nextPageToken: null, totalResults: 0 };
    }

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videos = data.items.map(video => {
      const stats = statsData.items?.find(s => s.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });

    return {
      videos,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      totalResults: data.pageInfo?.totalResults || videos.length
    };
  } catch (err) {
    console.error("Error fetching latest videos:", err);
    return { videos: [], nextPageToken: null, totalResults: 0 };
  }
}

/* ---------------------------------------------------------
   FIX 3: Ambil video terpopuler (aman dari error) + PAGINATION
--------------------------------------------------------- */
export async function getPopularVideos(maxResults = 50, pageToken = '') {
  try {
    let url = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=${maxResults}&key=${API_KEY}`;
    if (pageToken) url += `&pageToken=${pageToken}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return { videos: [], nextPageToken: null, totalResults: 0 };
    }

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videos = data.items.map(video => {
      const stats = statsData.items?.find(s => s.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });

    return {
      videos,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      totalResults: data.pageInfo?.totalResults || videos.length
    };
  } catch (err) {
    console.error("Error fetching popular videos:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   Formatting utils (aman)
--------------------------------------------------------- */
export function formatNumber(num) {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

export function formatDuration(duration) {
  if (!duration) return "0:00";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  if (hours) return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
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

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) return `${interval} ${unit}${interval !== 1 ? "s" : ""} ago`;
  }

  return "just now";
}

/* ---------------------------------------------------------
   PLAYLISTS API
--------------------------------------------------------- */
export async function getChannelPlaylists(maxResults = 50) {
  try {
    const response = await fetch(
      `${BASE_URL}/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];

    return data.items;
  } catch (err) {
    console.error("Error fetching playlists:", err);
    return [];
  }
}

export async function getPlaylistVideos(playlistId, maxResults = 50) {
  try {
    const response = await fetch(
      `${BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];

    const videoIds = data.items.map(item => item.snippet.resourceId.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      const stats = statsData.items?.find(s => s.id === videoId);
      return {
        id: { videoId },
        snippet: item.snippet,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });
  } catch (err) {
    console.error("Error fetching playlist videos:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   SEARCH API + PAGINATION
--------------------------------------------------------- */
export async function searchVideos(query, filters = {}) {
  try {
    const {
      order = 'relevance',
      videoDuration = 'any',
      maxResults = 50,
      pageToken = ''
    } = filters;

    let url = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=${order}&key=${API_KEY}`;

    if (videoDuration !== 'any') {
      url += `&videoDuration=${videoDuration}`;
    }
    
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return { videos: [], nextPageToken: null, totalResults: 0 };
    }

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videos = data.items.map(video => {
      const stats = statsData.items?.find(s => s.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });

    return {
      videos,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      totalResults: data.pageInfo?.totalResults || videos.length
    };
  } catch (err) {
    console.error("Error searching videos:", err);
    return { videos: [], nextPageToken: null, totalResults: 0 };
  }
}

/* ---------------------------------------------------------
   GET SINGLE VIDEO DETAILS
--------------------------------------------------------- */
export async function getVideoDetails(videoId) {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (!data.items || data.items.length === 0) return null;

    return data.items[0];
  } catch (err) {
    console.error("Error fetching video details:", err);
    return null;
  }
}

/* ---------------------------------------------------------
   GET RELATED VIDEOS
--------------------------------------------------------- */
export async function getRelatedVideos(videoId, maxResults = 12) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=${maxResults}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const data = await response.json();
    if (!data.items || data.items.length === 0) return [];

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    return data.items.map(video => {
      const stats = statsData.items?.find(s => s.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });
  } catch (err) {
    console.error("Error fetching related videos:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   GET SHORTS (Videos under 60 seconds) + PAGINATION
--------------------------------------------------------- */
export async function getShorts(maxResults = 50, pageToken = '') {
  try {
    let url = `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&videoDuration=short&maxResults=${maxResults}&order=date&key=${API_KEY}`;
    if (pageToken) url += `&pageToken=${pageToken}`;

    const response = await fetch(url, { next: { revalidate: 3600 } });
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return { videos: [], nextPageToken: null, totalResults: 0 };
    }

    const videoIds = data.items.map(v => v.id.videoId).join(",");

    const statsResponse = await fetch(
      `${BASE_URL}/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    const statsData = await statsResponse.json();

    const videos = data.items.map(video => {
      const stats = statsData.items?.find(s => s.id === video.id.videoId);
      return {
        ...video,
        statistics: stats?.statistics ?? {},
        contentDetails: stats?.contentDetails ?? {}
      };
    });

    return {
      videos,
      nextPageToken: data.nextPageToken || null,
      prevPageToken: data.prevPageToken || null,
      totalResults: data.pageInfo?.totalResults || videos.length
    };
  } catch (err) {
    console.error("Error fetching shorts:", err);
    return { videos: [], nextPageToken: null, totalResults: 0 };
  }
}
