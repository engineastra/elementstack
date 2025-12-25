'use client';
import dynamic from 'next/dynamic';
import { oxanium } from '@web-app/constants/Common';
import { useAllMachineQuestions } from '@web-app/hooks/useAllMachineQuestions';

const AllQuestions = dynamic(
  () => import('./AllQuestions'), // adjust path
  { ssr: false }
);

const MachineCode = () => {
  const { machineQuestions } = useAllMachineQuestions();
  return (
    <div className="flex flex-col w-full md:overflow-hidden">
      <div
        className={`flex flex-col w-full min-h-full ${oxanium.variable} px-1`}
      >
        <AllQuestions questions={machineQuestions} />
      </div>
    </div>
  );
};

export default MachineCode;
