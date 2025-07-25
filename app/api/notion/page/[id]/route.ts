import { NextRequest, NextResponse } from 'next/server';
import { getPage, getBlocks } from '@/lib/notion';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pageId = params.id;
    
    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const page = await getPage(pageId);
    const blocks = await getBlocks(pageId);
    
    return NextResponse.json({
      page,
      blocks
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  }
}

