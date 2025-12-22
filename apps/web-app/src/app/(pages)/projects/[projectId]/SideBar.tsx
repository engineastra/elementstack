'use client';
import { useContext } from 'react';
import ProjectHeader from './ProjectHeader';
import { ProjectDetailsContext } from '../../../../contexts/ProjectDetailsProvider';
import FolderTree from './FolderTree';

const SideBar = () => {
  const { projectDetails } = useContext(ProjectDetailsContext);
  const { rootFolder, sideBarExpanded } = projectDetails;

  return (
    <div
      className={`absolute md:static flex z-[3] ${
        sideBarExpanded ? 'w-[calc(100%-1rem)] shadow-sm shadow-greenishgrey' : 'w-fit'
      } md:w-fit md:h-full bg-pannel rounded-md `}
    >
      {
        <div className="flex flex-col h-full w-full">
          <ProjectHeader />
          {sideBarExpanded && (
            <div className="flex min-w-[280px] flex-col pl-5 pt-2 h-full pb-[20px]">
              <FolderTree folder={rootFolder} />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default SideBar;
