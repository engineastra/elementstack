import { getQuestionByIdFromDb } from '@elementstack/shared-db/machineQuestionsQueries';
import { NextRequest, NextResponse } from 'next/server';
import { use } from 'react';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const question = await getQuestionByIdFromDb(id);
  return NextResponse.json(question);
}
