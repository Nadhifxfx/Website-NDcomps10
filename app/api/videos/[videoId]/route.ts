import { NextRequest, NextResponse } from 'next/server';
import { getVideoDetails } from '@/lib/youtube';

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    const videoId = params.videoId;

    if (!videoId) {
      return NextResponse.json(
        { success: false, error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const video = await getVideoDetails(videoId);

    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Video not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      video
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch video details' },
      { status: 500 }
    );
  }
}
