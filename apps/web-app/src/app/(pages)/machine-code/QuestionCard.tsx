'use client';
import { COMMON_COLORS } from '@elementstack/shared-assets/Constants';
import { TechStack } from '@elementstack/shared-assets/Enums';
import {
  MachineQuestionMeta,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import { usePathname, useRouter } from 'next/navigation';

const getLevelColor = (type: QuestionLevel) => {
  if (QuestionLevel.EASY === type) {
    return 'success';
  } else if (QuestionLevel.MEDIUM === type) {
    return 'warning';
  } else {
    return 'error';
  }
};

const getTechStackColor = (tech: TechStack) => {
  if (TechStack.VanilaJS === tech) {
    return COMMON_COLORS.js;
  } else if (TechStack.React === tech) {
    return COMMON_COLORS.tsx;
  }
  return 'machine-500';
};

const QuestionCard = ({
  questionData,
}: {
  questionData: MachineQuestionMeta;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <div
        className={`flex flex-col min-w-[120px] justify-center gap-1 p-5 bg-pannel rounded-lg cursor-pointer border border-transparent hover:border-machine-500 transition-all`}
        onClick={() => {
          router.push(pathName.slice(1) + '/' + questionData.id);
        }}
      >
        <div className="flex w-full gap-2">
          <p className={`w-fit text-[16px] text-primaryText`}>
            {questionData.title}
          </p>
          <p
            className={`ml-auto w-fit h-fit text-[12px] text-${getLevelColor(
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
          <p
            className={`w-fit text-[12px] px-2 py-1 rounded-2xl border`}
            style={{
              color: getTechStackColor(questionData.techStack),
              borderColor: getTechStackColor(questionData.techStack),
            }}
          >
            {questionData.techStack}
          </p>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
