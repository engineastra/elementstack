'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import { useContext } from 'react';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { oxanium } from '@web-app/constants/Common';
import {
  MachineQuestionMeta,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';

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
  const { windowSize } = useContext(SizeProviderContext);
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);

  return (
    <>
      <div
        className={`flex flex-col min-w-[120px] justify-center gap-1 p-5 bg-pannel rounded-lg cursor-pointer border border-transparent hover:border-machine-500 transition-all`}
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
