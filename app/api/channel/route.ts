import { NextRequest, NextResponse } from 'next/server';
import { getChannelStats } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  try {
    const channelStats = await getChannelStats();

    if (!channelStats) {
      return NextResponse.json(
        { success: false, error: 'Channel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      channel: channelStats
    });
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch channel stats' },
      { status: 500 }
    );
  }
}
