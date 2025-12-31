import { DsaProblemMeta } from '@elementstack/shared-assets/Types';
import { useEffect, useState, useTransition } from 'react';

async function getAllQuestions() {
  const resp = await fetch('/api/dsa/allProblems');
  const problems = await resp.json();
  return problems;
}

export const useAllDsaProblems = () => {
  const [areProblemsLoaded, loadQuestionsInTransition] = useTransition();
  const [dsaProblems, setDsaProblems] = useState<Array<DsaProblemMeta>>([]);

  useEffect(() => {
    loadQuestionsInTransition(async () => {
      const problems = await getAllQuestions();
      if (problems) setDsaProblems(problems as DsaProblemMeta[]);
      // Error handling on no fetch
    });
  }, []);

  return {
    areProblemsLoaded,
    dsaProblems,
    setDsaProblems,
  };
};
