import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseItems } from '@/lib/notion';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const databaseId = params.id;
    
    if (!databaseId) {
      return NextResponse.json(
        { error: 'Database ID is required' },
        { status: 400 }
      );
    }

    const items = await getDatabaseItems(databaseId);
    
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching database items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch database items' },
      { status: 500 }
    );
  }
}

