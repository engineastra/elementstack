'use client';
import { COMMON_COLORS } from '@elementstack/shared-assets/Constants';
import {
  DsaProblemMeta,
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

const ProblemCard = ({ problemData }: { problemData: DsaProblemMeta }) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <>
      <div
        className={`flex flex-col min-w-[120px] justify-center gap-1 p-5 bg-pannel rounded-lg cursor-pointer border border-transparent hover:border-problems-500 transition-all my-[10px]`}
        onClick={() => {
          router.push(pathName.slice(1) + '/' + problemData.id);
        }}
      >
        <div className="flex w-full gap-2">
          <p className={`w-fit text-[16px] text-primaryText`}>
            {problemData.title}
          </p>
          <p
            className={`ml-auto w-fit h-fit text-[12px] text-${getLevelColor(
              problemData.level
            )} px-2 py-1 rounded-2xl border border-${getLevelColor(
              problemData.level
            )}`}
          >
            {problemData.level}
          </p>
        </div>
        <p className={`w-fit max-w-[87%] text-[14px] text-secondaryText`}>
          {problemData.quickDescription}
        </p>
        <div className="flex w-full gap-2 mt-2">
          <p
            className={`w-fit text-[12px] px-2 py-1 rounded-2xl border`}
            style={{
              color: COMMON_COLORS.problems[500],
              borderColor: COMMON_COLORS.problems[500],
            }}
          >
            {problemData.category}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProblemCard;
