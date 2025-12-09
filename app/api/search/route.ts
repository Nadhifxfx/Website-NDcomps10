import { NextRequest, NextResponse } from 'next/server';
import { searchVideos } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }

    const order = searchParams.get('order') || 'relevance';
    const videoDuration = searchParams.get('duration') || 'any';
    const maxResults = parseInt(searchParams.get('maxResults') || '20');

    const result = await searchVideos(query, {
      order,
      videoDuration,
      maxResults
    });

    return NextResponse.json({
      success: true,
      query,
      count: result.videos?.length || 0,
      totalResults: result.totalResults || 0,
      nextPageToken: result.nextPageToken,
      prevPageToken: result.prevPageToken,
      videos: result.videos || []
    });
  } catch (error) {
    console.error('Error searching videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search videos' },
      { status: 500 }
    );
  }
}
