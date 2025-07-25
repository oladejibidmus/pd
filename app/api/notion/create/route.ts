import { NextRequest, NextResponse } from 'next/server';
import { createPage } from '@/lib/notion';

export async function POST(
  request: NextRequest
) {
  try {
    const { databaseId, properties } = await request.json();
    
    if (!databaseId || !properties) {
      return NextResponse.json(
        { error: 'Database ID and properties are required' },
        { status: 400 }
      );
    }

    const newPage = await createPage(databaseId, properties);
    
    return NextResponse.json(newPage);
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    );
  }
}

