'use client';
import dynamic from 'next/dynamic';
import { oxanium } from '@web-app/constants/Common';
import { useAllDsaProblems } from '@web-app/hooks/useAllDsaProblems';

const AllProblems = dynamic(
  () => import('./AllProblems'), // adjust path
  { ssr: false }
);

const DsaProblems = () => {
  const { dsaProblems } = useAllDsaProblems();
  return (
    <div className="flex flex-col w-full md:overflow-hidden">
      <div
        className={`flex flex-col w-full min-h-full ${oxanium.variable} px-1`}
      >
        <AllProblems problems={dsaProblems} />
      </div>
    </div>
  );
};

export default DsaProblems;
