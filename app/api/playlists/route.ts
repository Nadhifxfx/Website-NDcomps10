import { NextRequest, NextResponse } from 'next/server';
import { getChannelPlaylists } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const maxResults = parseInt(searchParams.get('maxResults') || '50');

    const playlists = await getChannelPlaylists(maxResults);

    return NextResponse.json({
      success: true,
      count: playlists.length,
      playlists
    });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}
