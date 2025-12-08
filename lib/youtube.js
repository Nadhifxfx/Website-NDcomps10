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
      `${BASE_URL}/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${API_KEY}`,
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
   FIX 2: Ambil video terbaru (aman dari error)
--------------------------------------------------------- */
export async function getLatestVideos(maxResults = 20) {
  try {
    const channelStats = await getChannelStats();
    if (!channelStats) return [];

    const response = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&order=date&type=video&maxResults=${maxResults}&key=${API_KEY}`,
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
    console.error("Error fetching latest videos:", err);
    return [];
  }
}

/* ---------------------------------------------------------
   FIX 3: Ambil video terpopuler (aman dari error)
--------------------------------------------------------- */
export async function getPopularVideos(maxResults = 12) {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${CHANNEL_ID}&order=viewCount&type=video&maxResults=${maxResults}&key=${API_KEY}`,
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
