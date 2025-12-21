'use client';
import React, { use, useContext, useEffect } from 'react';
import SideBar from './SideBar';
import ProjectEditorSection from './ProjectEditorSection';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { getProjectFromLocalStorageById } from '@web-app/utils/projectUtils';

const SingleProject = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const paramObj = use(params);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { selectedFileId } = projectDetails;
  useEffect(() => {
    const projectData = getProjectFromLocalStorageById(paramObj.projectId);
    setProjectDetails({ payload: projectData });
  }, []);

  if (!projectDetails.id) return <></>;
  return (
    <div className="relative flex w-full h-full md:h-[100vh] min-h-[100vh] md:max-h-[100vh] p-2 gap-2">
      <SideBar />
      <ProjectEditorSection selectedFileId={selectedFileId} />
    </div>
  );
};

export default SingleProject;
