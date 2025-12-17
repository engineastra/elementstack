'use client';
import Image from 'next/image';
import addFileSVG from '@elementstack/shared-assets/icons/addFile.svg';
import addFolderSVG from '@elementstack/shared-assets/icons/addFolder.svg';
import deleteSVG from '@elementstack/shared-assets/icons/bin.svg';
import discardSVG from '@elementstack/shared-assets/icons/boxDash.svg';
import { FsItemType, SideBarOptions } from '@elementstack/shared-assets/Enums';
import { useContext } from 'react';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { EmptyFile } from '@elementstack/shared-assets/Constants';

const ProjectHeader = () => {
  const { projectDetails, setProjectDetails, deleteFilesAndFolders } =
    useContext(ProjectDetailsContext);
  const {
    tabs,
    rootFolder,
    newInputData,
    multipleItemsSelected,
    currentSelectedId,
    selectedSideBarOption,
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
          selectedFile: newTabs.length ? newTabs.at(-1) : EmptyFile,
          selectedFolderId: newTabs.length
            ? newTabs.at(-1)?.parentFolderId
            : newRootFolder?.id,
          tabs: newTabs,
        },
      });
    }
  };

  return (
    <div className="flex h-[] items-center p-2 pl-5 rounded-md rounded-b-none max-h-[100vh] border-b border-b-greenishgrey">
      <p className="text-[11px] py-[3px]">
        {projectDetails.selectedSideBarOption}
      </p>
      {selectedSideBarOption === SideBarOptions.FILES && (
        <div className="flex h-full items-center justify-center ml-auto gap-2">
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
          {rootFolder.id !== currentSelectedId && (
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
      )}
    </div>
  );
};

export default ProjectHeader;
