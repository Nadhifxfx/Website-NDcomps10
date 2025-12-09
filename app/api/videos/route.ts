import { NextRequest, NextResponse } from 'next/server';
import { getLatestVideos, getPopularVideos, getShorts } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'latest';
    const maxResults = parseInt(searchParams.get('maxResults') || '20');
    const pageToken = searchParams.get('pageToken') || '';

    let result: any;

    switch (type) {
      case 'popular':
        result = await getPopularVideos(maxResults, pageToken);
        break;
      case 'shorts':
        result = await getShorts(maxResults, pageToken);
        break;
      case 'latest':
      default:
        result = await getLatestVideos(maxResults, pageToken);
        break;
    }

    return NextResponse.json({
      success: true,
      count: result.videos?.length || 0,
      totalResults: result.totalResults || 0,
      nextPageToken: result.nextPageToken,
      prevPageToken: result.prevPageToken,
      videos: result.videos || []
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
