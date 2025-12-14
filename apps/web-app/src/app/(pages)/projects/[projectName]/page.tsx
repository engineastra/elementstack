'use client';
import React from 'react';
import FilesTab from 'apps/web-app/src/components/FilesTab';
import SideBar from 'apps/web-app/src/app/(pages)/projects/[projectName]/SideBar';

const SingleProject = () => {
  return (
    <div className="flex w-full h-[100vh] max-h-[100vh] p-2 gap-2">
      <SideBar />
      <div className="flex flex-1 flex-col bg-card h-full rounded-md">
        <FilesTab />
      </div>
    </div>
  );
};

export default SingleProject;
