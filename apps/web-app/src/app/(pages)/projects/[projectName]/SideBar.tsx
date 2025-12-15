'use client';
import Image from 'next/image';
import chevRightSVG from '@elementstack/shared-assets/icons/chevRight.svg';
import chevLeftSVG from '@elementstack/shared-assets/icons/chevLeft.svg';
import { useContext, useEffect, useState } from 'react';
import ProjectHeader from './ProjectHeader';
import { useSearchParams } from 'next/navigation';
import {
  CREATE_PROJECT_OPTIONS,
  SIDE_BAR_OPTIONS_ICON,
} from '@elementstack/shared-assets/Constants';
import { SideBarOptions } from '@elementstack/shared-assets/Enums';
import { ProjectDetailsContext } from '../../../..//contexts/ProjectDetailsProvider';
import { DummyRootFolder } from '../../../..//constants/MockData';
import FolderTree from '../../../..//components/FolderTree';

const SideBar = () => {
  const searchParams = useSearchParams();
  const projectType = searchParams.get('type') || '';
  const [opened, setOpened] = useState(true);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { rootFolder, selectedSideBarOption } = projectDetails;

  const handleOpenedEvent = () => {
    setOpened((prev) => !prev);
  };

  const handleOptionSelection = (val: SideBarOptions) => {
    setProjectDetails({ payload: { selectedSideBarOption: val } });
  };

  useEffect(() => {
    setProjectDetails({ payload: { rootFolder: DummyRootFolder } });
  }, []);

  return (
    <div className={`relative flex`}>
      <div
        className={`flex items-center flex-col bg-card h-full rounded-md ${
          opened ? 'rounded-r-none border-r border-r-greenishgrey' : ''
        }`}
      >
        <div className="flex w-full justify-center items-center h-[40px] border-b border-b-greenishgrey">
          <Image
            className="w-4"
            src={CREATE_PROJECT_OPTIONS[projectType].icon}
            alt="app-logo"
          />
        </div>
        <div
          className={`flex items-center h-[calc(100%-35px)] flex-col px-2 py-3 pt-[20px]`}
        >
          {Object.entries(SIDE_BAR_OPTIONS_ICON).map(
            ([key, value]: [string, { open: string; close: string }]) => {
              return (
                <div
                  key={key}
                  className="h-[40px]"
                  onClick={() => handleOptionSelection(key as SideBarOptions)}
                >
                  <Image
                    src={
                      selectedSideBarOption === key ? value.open : value.close
                    }
                    alt={key}
                    className={`h-[15px] cursor-pointer`}
                  />
                </div>
              );
            }
          )}
        </div>
        <div className="expandable-icon" onClick={handleOpenedEvent}>
          <Image
            src={opened ? chevLeftSVG : chevRightSVG}
            alt="expand"
            className={`w-4 h-4 cursor-pointer`}
          />
        </div>
      </div>
      {opened && (
        <div className="flex flex-col w-[250px] max-w-[250px] bg-card h-full rounded-r-md">
          <ProjectHeader />
          {selectedSideBarOption === SideBarOptions.FILES && (
            <div className="flex flex-col pl-5 pt-2 h-full">
              <FolderTree folder={rootFolder} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
