'use client';
import Image from 'next/image';
import {
  CreateNewFolder,
  NoteAdd as CreateNewFile,
  DeleteSweep,
  IndeterminateCheckBoxOutlined as Discard,
} from '@mui/icons-material';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import { useContext, useState } from 'react';
import { iconColor } from '@web-app/utils/commonUtils';
import Modal from '@web-app/components/Modal';
import DeletePopUp from '@web-app/components/DeletePopUp';
import { FsContext } from './FileSystem';

const FsHeader = ({ icon, title }: { icon?: string; title?: string }) => {
  const { fsData, setFsData, deleteFilesAndFolders } = useContext(FsContext);
  const {
    treeItemSelectionId,
    multipleItemsSelected,
    rootFolder,
    nameChangeInputData,
  } = fsData;
  const [deleteConfimPopupToggle, setDeleteConfimPopupToggle] = useState(false);

  const handleOnAddClick = (type: FsItemType) => {
    setFsData({
      payload: {
        nameChangeInputData: { ...nameChangeInputData, type, toggle: true },
      },
    });
  };

  const handleOnDeleteItems = () => {
    if (multipleItemsSelected.length) {
      const newRootFolder = deleteFilesAndFolders(rootFolder);
      setFsData({
        payload: {
          rootFolder: newRootFolder,
          multipleItemsSelected: [],
          treeItemSelectionId: rootFolder.id,
          selectedFileId: '',
          selectedFolderId: rootFolder.id,
        },
      });
    }
    setDeleteConfimPopupToggle(false);
  };

  return (
    <div className="flex items-center rounded-md rounded-b-none">
      {icon && <Image className="w-4" src={icon} alt="app-logo" />}
      {title && <p className="text-[12px] ml-[6px] mr-[15px]">{title}</p>}
      <div className={`flex h-full items-center justify-center gap-1 ml-auto`}>
        {multipleItemsSelected.length > 0 && (
          <DeleteSweep
            sx={{
              fontSize: 18,
              cursor: 'pointer',
              ...iconColor('#EF4444'),
            }}
            onClick={() => setDeleteConfimPopupToggle(true)}
          />
        )}
        <CreateNewFile
          sx={{
            fontSize: 17,
            cursor: 'pointer',
            ...iconColor('#4db5f5'),
          }}
          onClick={() => handleOnAddClick(FsItemType.FILE)}
        />
        <CreateNewFolder
          sx={{
            fontSize: 18,
            cursor: 'pointer',
            ...iconColor('#875fff'),
          }}
          onClick={() => handleOnAddClick(FsItemType.FOLDER)}
        />
        {multipleItemsSelected.length > 1 && (
          <Discard
            sx={{
              fontSize: 17,
              cursor: 'pointer',
              ...iconColor('#e4fb64'),
            }}
            onClick={() => {
              setFsData({
                payload: { multipleItemsSelected: [treeItemSelectionId] },
              });
            }}
          />
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

export default FsHeader;
