'use client';
import Image from 'next/image';
import addFileSVG from '@elementstack/shared-assets/icons/addFile.svg';
import addFolderSVG from '@elementstack/shared-assets/icons/addFolder.svg';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import { useContext } from 'react';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';

const ProjectHeader = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { newInputData, selectedFolder } = projectDetails;
  const handleOnAddClick = (type: FsItemType) => {
    setProjectDetails({
      payload: {
        newInputData: {
          ...newInputData,
          isEnabled: true,
          folderId: selectedFolder,
          type,
        },
      },
    });
  };

  return (
    <div className="flex h-[] items-center p-2 pl-5 rounded-md rounded-b-none max-h-[100vh] border-b border-b-greenishgrey">
      <p className="text-[11px] py-[3px]">
        {projectDetails.selectedSideBarOption}
      </p>
      <div className="flex h-full items-center ml-auto gap-2">
        <Image
          className="inline h-3 w-fit cursor-pointer"
          src={addFileSVG}
          alt="add-file"
          onClick={() => handleOnAddClick(FsItemType.FILE)}
        />
        <Image
          className="inline h-3 w-fit cursor-pointer"
          src={addFolderSVG}
          alt="add-folder"
          onClick={() => handleOnAddClick(FsItemType.FOLDER)}
        />
      </div>
    </div>
  );
};

export default ProjectHeader;
