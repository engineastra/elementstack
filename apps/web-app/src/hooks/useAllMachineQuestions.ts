import { MachineQuestionMeta } from '@elementstack/shared-assets/Types';
import { useEffect, useState, useTransition } from 'react';

async function getAllQuestions() {
  const questions = (
    await import('@elementstack/shared-assets/50Questions.json')
  ).default;
  return questions;
}

export const useAllMachineQuestions = () => {
  const [isQuestionsLoaded, loadQuestionsInTransition] = useTransition();
  const [machineQuestions, setMachineQuestions] = useState<
    Array<MachineQuestionMeta>
  >([]);

  useEffect(() => {
    loadQuestionsInTransition(async () => {
      const questions: any = await getAllQuestions();
      if (questions) setMachineQuestions(questions as MachineQuestionMeta[]);
      // Error handling on no fetch
    });
  }, []);

  return {
    isQuestionsLoaded,
    machineQuestions,
    setMachineQuestions,
  };
};
