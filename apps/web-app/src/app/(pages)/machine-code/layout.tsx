import MachineQuestionProvider from '@web-app/contexts/MachineQuestionProvider';
import React, { ReactNode } from 'react';

const ProjectLayout = ({ children }: { children: ReactNode }) => {
  return <MachineQuestionProvider>{children}</MachineQuestionProvider>;
};

export default ProjectLayout;
