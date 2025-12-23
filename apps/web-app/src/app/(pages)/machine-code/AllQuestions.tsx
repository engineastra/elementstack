'use client';
// import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
// import { useContext } from 'react';
// import {
//   DEVICE_SIZES,
//   SizeProviderContext,
// } from '@web-app/contexts/SizeProvider';
import { MachineQuestionMeta } from '@elementstack/shared-assets/Types';
import QuestionCard from './QuestionCard';

const AllQuestions = ({ questions }: { questions: MachineQuestionMeta[] }) => {
  // const { windowSize } = useContext(SizeProviderContext);
  // const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="flex flex-col md:flex-[0.6] h-[100%] p-2">
        <div className="flex flex-col flex-1 gap-[30px]">
          {questions.map((ques) => {
            return <QuestionCard key={ques.id} questionData={ques} />;
          })}
        </div>
      </div>
      <div className="sticky top-0 flex md:flex-[0.4] h-10"></div>
    </div>
  );
};

export default AllQuestions;
