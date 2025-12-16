'use client';
import React, { use, useContext, useEffect } from 'react';
import SideBar from './SideBar';
import FilesTab from '@web-app/components/FilesTab';
import ProjectEditorSection from './ProjectEditorSection';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { SideBarOptions } from '@elementstack/shared-assets/Enums';
import { getProjectFromLocalStorageById } from '@web-app/utils/commonUtils';

const SingleProject = ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const paramObj = use(params);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { selectedSideBarOption } = projectDetails;
  useEffect(() => {
    const projectData = getProjectFromLocalStorageById(paramObj.projectId);
    setProjectDetails({ payload: projectData });
  }, []);

  if (!projectDetails.id) return <></>;
  return (
    <div className="flex w-full h-[100vh] max-h-[100vh] p-2 gap-1">
      <SideBar />
      <div className="flex flex-1 flex-col bg-card h-full rounded-md">
        {selectedSideBarOption === SideBarOptions.PREVIEW ? (
          <></>
        ) : (
          <>
            <FilesTab />
            <ProjectEditorSection />
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
