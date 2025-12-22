'use client';
import Image from 'next/image';
import {
  ChevronRight,
  ChevronLeft,
  CreateNewFolder,
  NoteAdd as CreateNewFile,
  DeleteSweep,
  IndeterminateCheckBoxOutlined as Discard,
  Preview as PreviewIcon,
} from '@mui/icons-material';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import { useContext, useEffect, useState } from 'react';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import {
  CREATE_PROJECT_OPTIONS,
  EmptyFile,
} from '@elementstack/shared-assets/Constants';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { iconColor } from '@web-app/utils/commonUtils';
import Modal from '@web-app/components/Modal';
import DeletePopUp from '@web-app/components/DeletePopUp';

const ProjectHeader = () => {
  const { windowSize } = useContext(SizeProviderContext);
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);
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
  const [deleteConfimPopupToggle, setDeleteConfimPopupToggle] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setProjectDetails({ payload: { sideBarExpanded: false } });
    }
  }, [isMobile]);

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
    setDeleteConfimPopupToggle(false);
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
            className={`flex h-full items-center justify-center ml-auto mr-[15px]`}
          >
            {!isPreviewOn && (
              <PreviewIcon
                sx={{
                  height: '20px',
                  width: '24px',
                  cursor: 'pointer',
                  ...iconColor('#1ac3ac'),
                }}
                onClick={() =>
                  setProjectDetails({
                    payload: { isPreviewOn: true, sideBarExpanded: false },
                  })
                }
              />
            )}
            {multipleItemsSelected.length > 0 && (
              <DeleteSweep
                sx={{
                  height: '20px',
                  width: '24px',
                  cursor: 'pointer',
                  ...iconColor('#EF4444'),
                }}
                onClick={() => setDeleteConfimPopupToggle(true)}
              />
            )}
            <CreateNewFile
              sx={{
                height: '18px',
                width: '20px',
                cursor: 'pointer',
                ...iconColor('#4db5f5'),
              }}
              onClick={() => handleOnAddClick(FsItemType.FILE)}
            />
            <CreateNewFolder
              sx={{
                height: '20px',
                width: '24px',
                cursor: 'pointer',
                ...iconColor('#875fff'),
              }}
              onClick={() => handleOnAddClick(FsItemType.FOLDER)}
            />
            {multipleItemsSelected.length > 1 && (
              <Discard
                sx={{
                  height: '20px',
                  width: '24px',
                  cursor: 'pointer',
                  ...iconColor('#e4fb64'),
                }}
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
      <div
        className={`p-[8px] w-[25px] h-[25px] cursor-pointer bg-greenishgrey rounded-lg hover:scale-105 ${
          sideBarExpanded && isMobile ? 'rotate-90' : ''
        } animate-pulse flex justify-center items-center`}
        onClick={handleOpenedEvent}
      >
        {sideBarExpanded ? (
          <ChevronLeft sx={{ fontSize: 15, ...iconColor('lightgreen') }} />
        ) : (
          <ChevronRight sx={{ fontSize: 15, ...iconColor('lightgreen') }} />
        )}
      </div>
      <Modal
        isOpen={deleteConfimPopupToggle}
        onClose={() => setDeleteConfimPopupToggle(false)}
      >
        <DeletePopUp
          onCancel={() => setDeleteConfimPopupToggle(false)}
          onConfirm={handleOnDeleteItems}
        />
      </Modal>
    </div>
  );
};

export default ProjectHeader;
