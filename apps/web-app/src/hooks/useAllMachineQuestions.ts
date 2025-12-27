import { MachineQuestionMeta } from '@elementstack/shared-assets/Types';
import { useEffect, useState, useTransition } from 'react';

async function getAllQuestions() {
  const resp = await fetch('/api/machine/allQuestions');
  const questions = await resp.json();
  return questions;
}

export const useAllMachineQuestions = () => {
  const [isQuestionsLoaded, loadQuestionsInTransition] = useTransition();
  const [machineQuestions, setMachineQuestions] = useState<
    Array<MachineQuestionMeta>
  >([]);

  useEffect(() => {
    loadQuestionsInTransition(async () => {
      const questions = await getAllQuestions();
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
