'use client';
import React, { use, useContext } from 'react';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';

const SingleQuestion = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const paramObj = use(params);
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );

  return (
    <div className="relative flex w-full h-[100vh] md:max-h-[100vh] p-2 gap-2"></div>
  );
};

export default SingleQuestion;
