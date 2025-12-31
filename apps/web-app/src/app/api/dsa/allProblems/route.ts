import { NextRequest, NextResponse } from 'next/server';
import { getAllDsaProblemsFromDb } from '@elementstack/shared-db/dsaProblemsQueries';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// GET request
export async function GET(request: NextRequest) {
  const questions = await getAllDsaProblemsFromDb();
  return NextResponse.json(questions, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
