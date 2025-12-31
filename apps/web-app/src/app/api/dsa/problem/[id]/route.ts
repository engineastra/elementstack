import { getDsaProblemByIdFromDb } from '@elementstack/shared-db/dsaProblemsQueries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const question = await getDsaProblemByIdFromDb(id);
  return NextResponse.json(question, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
