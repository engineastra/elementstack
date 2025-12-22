'use client';
import { oxanium } from '@web-app/constants/Common';
import Header from './Header';

const MachineCode = () => {
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${oxanium.variable} px-2 md:px-5 py-4 feature-grad`}
    >
      <Header />
    </div>
  );
};

export default MachineCode;
