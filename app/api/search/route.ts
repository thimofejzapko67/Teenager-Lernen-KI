import { search } from '@/lib/search';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/search?q=query
 * Global search endpoint
 */
export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q') || '';
    const typeParams = request.nextUrl.searchParams.getAll('type');
    const types = typeParams.length > 0
      ? (typeParams as ('lesson' | 'user' | 'project')[])
      : undefined;

    const results = await search(query, {
      types,
      limit: 20,
    });

    return NextResponse.json({ results, query });
  } catch (error) {
    console.error('Error in GET /api/search:', error);
    return NextResponse.json(
      { error: 'Internal server error', results: [] },
      { status: 500 }
    );
  }
}
