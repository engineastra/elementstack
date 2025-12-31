import { prisma } from '../prisma';
import {
  DsaProblemMeta,
  QuestionLevel,
  TestCase,
} from '@elementstack/shared-assets/Types';

export async function getAllDsaProblemsFromDb() {
  const respProblems = await prisma.dsa_questions.findMany();

  const allProblems: DsaProblemMeta[] = respProblems.map((obj) => {
    const ques: DsaProblemMeta = {
      id: obj.id,
      title: obj.title as string,
      level: obj.level as QuestionLevel,
      quickDescription: obj.quick_description as string,
      detailedDescription: obj.detailed_description as string,
      testCases: obj.test_cases as TestCase,
      hints: obj.hints as string[],
      category: obj.category,
      subcategory: obj.subcategory,
      companyTags: obj.company_tags as Array<string>,
      constraints: obj.constraints as Array<string>,
      similarProblems: obj.similar_problems as Array<string>,
      relatedTopics: obj.related_topics as Array<string>,
      keyConcepts: obj.key_concepts as Array<string>,
      solution: obj.solution as Record<string, string>,
      timeEstimate: obj.time_estimate as string,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at as Date,
    };
    return ques;
  });
  return allProblems;
}

export async function getDsaProblemByIdFromDb(id: string) {
  const resProblemData = await prisma.dsa_questions.findUnique({
    where: { id },
  });
  let ques: DsaProblemMeta | null = null;
  if (resProblemData) {
    ques = {
      id: resProblemData.id,
      title: resProblemData.title as string,
      level: resProblemData.level as QuestionLevel,
      quickDescription: resProblemData.quick_description as string,
      detailedDescription: resProblemData.detailed_description as string,
      testCases: resProblemData.test_cases as TestCase,
      hints: resProblemData.hints as string[],
      solution: resProblemData.solution as Record<string, string>,
      timeEstimate: resProblemData.time_estimate as string,
      createdAt: resProblemData.created_at,
      updatedAt: resProblemData.updated_at as Date,
      category: resProblemData.category,
      subcategory: resProblemData.subcategory,
      companyTags: resProblemData.company_tags as Array<string>,
      constraints: resProblemData.constraints as Array<string>,
      similarProblems: resProblemData.similar_problems as Array<string>,
      relatedTopics: resProblemData.related_topics as Array<string>,
      keyConcepts: resProblemData.key_concepts as Array<string>,
    };
  }
  return ques;
}
