import ProjectDetailsProvider from '@web-app/contexts/ProjectDetailsProvider';
import React, { ReactNode } from 'react';

const SingleProjectLayout = ({ children }: { children: ReactNode }) => {
  return <ProjectDetailsProvider>{children}</ProjectDetailsProvider>;
};

export default SingleProjectLayout;
