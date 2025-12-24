'use client';
import { oxanium } from '@web-app/constants/Common';
import AllQuestions from './AllQuestions';
import { useAllMachineQuestions } from '@web-app/hooks/useAllMachineQuestions';

const MachineCode = () => {
  const { machineQuestions } = useAllMachineQuestions();
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div
        className={`flex flex-col w-full min-h-full ${oxanium.variable} pl-2`}
      >
        <AllQuestions questions={machineQuestions} />
      </div>
    </div>
  );
};

export default MachineCode;
