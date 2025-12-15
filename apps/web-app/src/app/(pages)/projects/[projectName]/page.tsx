import React from 'react';
import SideBar from './SideBar';
import FilesTab from '@web-app/components/FilesTab';

const SingleProject = () => {
  return (
    <div className="flex w-full h-[100vh] max-h-[100vh] p-2 gap-1">
      <SideBar />
      <div className="flex flex-1 flex-col bg-card h-full rounded-md">
        <FilesTab />
      </div>
    </div>
  );
};

export default SingleProject;
