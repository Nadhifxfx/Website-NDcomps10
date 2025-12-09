import { NextRequest, NextResponse } from 'next/server';
import { getPlaylistVideos } from '@/lib/youtube';

export async function GET(
  request: NextRequest,
  { params }: { params: { playlistId: string } }
) {
  try {
    const playlistId = params.playlistId;

    if (!playlistId) {
      return NextResponse.json(
        { success: false, error: 'Playlist ID is required' },
        { status: 400 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const maxResults = parseInt(searchParams.get('maxResults') || '50');

    const videos = await getPlaylistVideos(playlistId, maxResults);

    return NextResponse.json({
      success: true,
      playlistId,
      count: videos.length,
      videos
    });
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch playlist videos' },
      { status: 500 }
    );
  }
}
