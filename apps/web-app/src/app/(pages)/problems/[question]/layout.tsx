import { ReactNode } from 'react';
import DsaProblemsProvider from '@web-app/contexts/DsaProblemsProvider';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <DsaProblemsProvider>{children}</DsaProblemsProvider>;
};

export default CommonLayout;
