'use client';
import Image from 'next/image';
import chevRightSVG from '@elementstack/shared-assets/icons/chevRight.svg';
import chevLeftSVG from '@elementstack/shared-assets/icons/chevLeft.svg';
import addFileSVG from '@elementstack/shared-assets/icons/addFile.svg';
import addFolderSVG from '@elementstack/shared-assets/icons/addFolder.svg';
import deleteSVG from '@elementstack/shared-assets/icons/bin.svg';
import discardSVG from '@elementstack/shared-assets/icons/boxDash.svg';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import playOpenSVG from '@elementstack/shared-assets/icons/playOpen.svg';
import { useContext } from 'react';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import {
  CREATE_PROJECT_OPTIONS,
  EmptyFile,
} from '@elementstack/shared-assets/Constants';

const ProjectHeader = () => {
  const { projectDetails, setProjectDetails, deleteFilesAndFolders } =
    useContext(ProjectDetailsContext);
  const {
    tabs,
    newInputData,
    multipleItemsSelected,
    currentSelectedId,
    isPreviewOn,
    sideBarExpanded,
  } = projectDetails;

  const handleOnAddClick = (type: FsItemType) => {
    setProjectDetails({
      payload: {
        newInputData: {
          ...newInputData,
          isEnabled: true,
          type,
        },
      },
    });
  };

  const handleOpenedEvent = () => {
    setProjectDetails({ payload: { sideBarExpanded: !sideBarExpanded } });
  };

  const handleOnDeleteItems = () => {
    if (multipleItemsSelected.length) {
      const newTabs = tabs.filter(
        (file) => !multipleItemsSelected.includes(file.id)
      );
      const newRootFolder = deleteFilesAndFolders();
      setProjectDetails({
        payload: {
          rootFolder: newRootFolder,
          multipleItemsSelected: [],
          currentSelectedId: newTabs.length
            ? newTabs.at(-1)?.id
            : newRootFolder?.id,
          selectedFileId: newTabs.at(-1)?.id || EmptyFile.id,
          selectedFolderId: newTabs.length
            ? newTabs.at(-1)?.parentFolderId
            : newRootFolder?.id,
          tabs: newTabs,
        },
      });
    }
  };

  return (
    <div className="flex h-[40px] items-center p-2 rounded-md rounded-b-none max-h-[100vh] border-b border-b-greenishgrey">
      {sideBarExpanded && (
        <>
          <Image
            className="w-4"
            src={CREATE_PROJECT_OPTIONS[projectDetails.type].icon}
            alt="app-logo"
          />
          <p className="text-[12px] ml-[6px]">
            {CREATE_PROJECT_OPTIONS[projectDetails.type].title}
          </p>
          <div
            className={`flex h-full items-center justify-center ml-auto mr-[15px] gap-2 `}
          >
            {!isPreviewOn && (
              <Image
                className="inline h-3 w-fit cursor-pointer"
                src={playOpenSVG}
                alt="preview-file"
                onClick={() =>
                  setProjectDetails({
                    payload: { isPreviewOn: true, sideBarExpanded: false },
                  })
                }
              />
            )}
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
            {multipleItemsSelected.length > 0 && (
              <Image
                className="inline h-3 w-fit cursor-pointer"
                src={deleteSVG}
                alt="delete-file-or-folder"
                onClick={handleOnDeleteItems}
              />
            )}
            {multipleItemsSelected.length > 1 && (
              <Image
                className="inline h-3 w-fit cursor-pointer"
                src={discardSVG}
                alt="delete-file-or-folder"
                onClick={() => {
                  setProjectDetails({
                    payload: { multipleItemsSelected: [currentSelectedId] },
                  });
                }}
              />
            )}
          </div>
        </>
      )}
      <Image
        src={sideBarExpanded ? chevLeftSVG : chevRightSVG}
        alt="expand"
        className="p-[8px] w-[25px] h-[25px] cursor-pointer bg-greenishgrey rounded-lg hover:scale-105 animate-pulse"
        onClick={handleOpenedEvent}
      />
    </div>
  );
};

export default ProjectHeader;
