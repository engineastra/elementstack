'use client';
import React, { use } from 'react';
import ProjectHeader from './ProjectHeader';
import { useSearchParams } from 'next/navigation';

const SingleProject = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('name') || '';
  const projectType = searchParams.get('type') || '';
  console.log(projectName, projectType);
  return (
    <div>
      <ProjectHeader type={projectType} name={projectName} />
    </div>
  );
};

export default SingleProject;
