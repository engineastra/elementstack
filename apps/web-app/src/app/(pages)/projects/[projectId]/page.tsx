'use client';
import React, { use, useContext, useEffect } from 'react';
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
  const { fsDetails } = projectDetails;
  const { selectedFileId } = fsDetails;
  useEffect(() => {
    const projectData = getProjectFromLocalStorageById(paramObj.projectId);
    setProjectDetails({ payload: projectData });
  }, []);

  if (!projectDetails.meta.id) return <></>;
  return (
    <div className="relative flex w-full min-h-[100vh] p-2 gap-2">
      <ProjectEditorSection selectedFileId={selectedFileId} />
    </div>
  );
};

export default SingleProject;
