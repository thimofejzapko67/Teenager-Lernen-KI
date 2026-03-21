import { getSponsors, getSponsorIndustries } from '@/lib/sponsors';
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/sponsors
 * Get sponsors with optional filters and industries list
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tier = searchParams.get('tier');
    const industry = searchParams.get('industry');

    const [sponsors, industries] = await Promise.all([
      getSponsors({
        tier: tier as any,
        industry: industry || undefined,
      }),
      getSponsorIndustries(),
    ]);

    return NextResponse.json({
      sponsors,
      industries,
    });
  } catch (error) {
    console.error('Error in GET /api/sponsors:', error);
    return NextResponse.json(
      { error: 'Internal server error', sponsors: [], industries: [] },
      { status: 500 }
    );
  }
}
