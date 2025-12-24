import { ReactNode } from 'react';
import MachineQuestionProvider from '@web-app/contexts/MachineQuestionProvider';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <MachineQuestionProvider>{children}</MachineQuestionProvider>;
};

export default CommonLayout;
