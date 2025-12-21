'use client';
import { oxanium } from '@web-app/constants/Common';
import AllProjects from './AllProjects';
import Header from './Header';
import { useState } from 'react';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';

const Project = () => {
  const [projects, setProjects] = useState<Array<ProjectDetailsSchema>>([]);
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${oxanium.variable} px-2 md:px-5 py-4`}
    >
      <Header projects={projects}/>
      <AllProjects projects={projects} setProjects={setProjects} />
    </div>
  );
};

export default Project;
