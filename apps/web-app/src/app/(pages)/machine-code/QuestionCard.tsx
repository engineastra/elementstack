'use client';
import {
  MachineQuestionMeta,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';

const getLevelColor = (type: QuestionLevel) => {
  if (QuestionLevel.EASY === type) {
    return 'success';
  } else if (QuestionLevel.MEDIUM === type) {
    return 'warning';
  } else {
    return 'error';
  }
};

const QuestionCard = ({
  questionData,
}: {
  questionData: MachineQuestionMeta;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  return (
    <>
      <div
        className={`flex flex-col min-w-[120px] justify-center gap-1 p-5 bg-pannel rounded-lg cursor-pointer border border-transparent hover:border-machine-500 transition-all`}
        onClick={() => {
          setMachineQuestionDetails({ payload: { metaData: questionData } });
          router.push(pathName.slice(1) + '/' + questionData.id);
        }}
      >
        <div className="flex w-full gap-2">
          <p className={`w-fit text-[16px] text-primaryText`}>
            {questionData.title}
          </p>
          <p
            className={`ml-auto w-fit text-[12px] text-${getLevelColor(
              questionData.level
            )} px-2 py-1 rounded-2xl border border-${getLevelColor(
              questionData.level
            )}`}
          >
            {questionData.level}
          </p>
        </div>
        <p className={`w-fit max-w-[87%] text-[14px] text-secondaryText`}>
          {questionData.quickDescription}
        </p>
        <div className="flex w-full gap-2 mt-2">
          <p className="w-fit text-[12px] text-machine-500 px-2 py-1 rounded-2xl border border-machine-500">
            {questionData.techStack}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
