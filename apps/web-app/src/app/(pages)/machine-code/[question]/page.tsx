'use client';
import React, { use, useContext, useEffect, useTransition } from 'react';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import Description from './Description';
import { QuestionLevel } from '@elementstack/shared-assets/Types';
import Tab from './Tab';
import { MachineTabs, TechStack } from '@elementstack/shared-assets/Enums';

async function getQuestionById(id: string) {
  const questions = (
    await import('@elementstack/shared-assets/50Questions.json')
  ).default;
  return questions.frontendMachineCodingQuestions.find((obj) => obj.id === id);
}

const SingleQuestion = ({
  params,
}: {
  params: Promise<{ question: string }>;
}) => {
  const paramObj = use(params);
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const [, loadQuestionInTransition] = useTransition();
  const { selectedLeftTab } = machineQuestionDetails;

  useEffect(() => {
    loadQuestionInTransition(async () => {
      const quesObj = await getQuestionById(paramObj.question);
      if (quesObj)
        setMachineQuestionDetails({
          payload: {
            metaData: {
              id: quesObj.id,
              title: quesObj.title,
              techStack: quesObj.techStack as TechStack,
              level: quesObj.level as QuestionLevel,
              quickDescription: quesObj.quickDescription,
              detailedDescription: quesObj.detailedDescription,
              hints: quesObj.hints,
              keyFeatures: quesObj.keyFeatures,
            },
          },
        });
    });
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-2 bg-backgroundAccent">
      <div className="flex flex-col rounded-xl border bg-card border-greenishgrey overflow-hidden gap-2">
        <Tab />
        {selectedLeftTab === MachineTabs.Desc && <Description />}
      </div>
      <div className="flex flex-col"></div>
    </div>
  );
};

export default SingleQuestion;
