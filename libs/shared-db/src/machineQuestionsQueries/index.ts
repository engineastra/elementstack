import { TechStack } from '@elementstack/shared-assets/Enums';
import { prisma } from '../prisma';
import {
  MachineQuestionMeta,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';

export async function getAllQuestionsFromDb() {
  const respQuestions = await prisma.machine_coding_questions.findMany();

  const allQuestions: MachineQuestionMeta[] = respQuestions.map((obj) => {
    const ques: MachineQuestionMeta = {
      id: obj.id,
      title: obj.title as string,
      techStack: obj.tech_stack as TechStack,
      level: obj.level as QuestionLevel,
      quickDescription: obj.quick_description as string,
      detailedDescription: obj.detailed_description as string,
      hints: obj.hints as string[],
      solution: obj.solution as Record<string, string>,
      keyFeatures: obj.key_features as string[],
      timeEstimate: obj.time_estimate as string,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at as Date,
    };
    return ques;
  });
  return allQuestions;
}

export async function getQuestionByIdFromDb(id: string) {
  const resQuesData = await prisma.machine_coding_questions.findUnique({
    where: { id },
  });
  let ques: MachineQuestionMeta | null = null;
  if (resQuesData) {
    ques = {
      id: resQuesData.id,
      title: resQuesData.title as string,
      techStack: resQuesData.tech_stack as TechStack,
      level: resQuesData.level as QuestionLevel,
      quickDescription: resQuesData.quick_description as string,
      detailedDescription: resQuesData.detailed_description as string,
      hints: resQuesData.hints as string[],
      solution: resQuesData.solution as Record<string, string>,
      keyFeatures: resQuesData.key_features as string[],
      timeEstimate: resQuesData.time_estimate as string,
      createdAt: resQuesData.created_at,
      updatedAt: resQuesData.updated_at as Date,
    };
  }
  return ques;
}
