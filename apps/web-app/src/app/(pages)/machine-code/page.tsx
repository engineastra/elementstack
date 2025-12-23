'use client';
import { oxanium } from '@web-app/constants/Common';
import Header from './Header';
import AllQuestions from './AllQuestions';
import { useAllMachineQuestions } from '@web-app/hooks/useAllMachineQuestions';

const MachineCode = () => {
  const { isQuestionsLoaded, machineQuestions, setMachineQuestions } =
    useAllMachineQuestions();
  return (
    <div className='relative flex flex-col w-full overflow-hidden'>
      <div
        className={`flex flex-col w-full min-h-full ${oxanium.variable} pl-2 overflow-y-auto`}
      >
        <Header />
        <AllQuestions questions={machineQuestions} />
      </div>
    </div>
  );
};

export default MachineCode;
