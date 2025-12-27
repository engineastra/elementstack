import { NextRequest, NextResponse } from 'next/server';
import { getAllQuestionsFromDb } from '@elementstack/shared-db/machineQuestionsQueries';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// GET request
export async function GET(request: NextRequest) {
  const questions = await getAllQuestionsFromDb();
  return NextResponse.json(questions);
}