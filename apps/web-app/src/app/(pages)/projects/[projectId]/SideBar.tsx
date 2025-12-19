'use client';
import Image from 'next/image';
import chevRightSVG from '@elementstack/shared-assets/icons/chevRight.svg';
import chevLeftSVG from '@elementstack/shared-assets/icons/chevLeft.svg';
import { useContext } from 'react';
import ProjectHeader from './ProjectHeader';
import { ProjectDetailsContext } from '../../../../contexts/ProjectDetailsProvider';
import FolderTree from './FolderTree';

const SideBar = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { rootFolder, sideBarExpanded } = projectDetails;

  const handleOpenedEvent = () => {
    setProjectDetails({ payload: { sideBarExpanded: !sideBarExpanded } });
  };

  return (
    <div className={`relative flex`}>
      <div className={`flex items-center flex-col bg-card h-full rounded-md`}>
        <div
          className={`${
            sideBarExpanded ? 'hidden' : 'flex'
          } items-center h-[calc(100%-35px)] flex-col px-2 py-3 pt-[20px]`}
        ></div>
        <div className="expandable-icon" onClick={handleOpenedEvent}>
          <Image
            src={sideBarExpanded ? chevLeftSVG : chevRightSVG}
            alt="expand"
            className={`w-4 h-4 cursor-pointer`}
          />
        </div>
      </div>
      {sideBarExpanded && (
        <div className="flex flex-col w-[250px] max-w-[250px] bg-card h-full rounded-md">
          <ProjectHeader />
          <div className="flex flex-col pl-5 pt-2 h-full">
            <FolderTree folder={rootFolder} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
