'use client';
import Image from 'next/image';
import {
  CreateNewFolder,
  NoteAdd as CreateNewFile,
  DeleteSweep,
  IndeterminateCheckBoxOutlined as Discard,
} from '@mui/icons-material';
import { FsItemType, TechStack } from '@elementstack/shared-assets/Enums';
import { Dispatch, useContext, useState } from 'react';
import { CREATE_PROJECT_OPTIONS } from '@elementstack/shared-assets/Constants';
import { iconColor } from '@web-app/utils/commonUtils';
import Modal from '@web-app/components/Modal';
import DeletePopUp from '@web-app/components/DeletePopUp';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { InputType } from './FilesSection';

const RightTabHeader = ({
  inputData,
  setInputData,
}: {
  inputData: InputType;
  setInputData: Dispatch<InputType>;
}) => {
  const {
    machineQuestionDetails,
    setMachineQuestionDetails,
    deleteFilesAndFolders,
  } = useContext(MachineQuestionDetailsContext);
  const { metaData, treeItemSelectionId, multipleItemsSelected, rootFolder } =
    machineQuestionDetails;
  const [deleteConfimPopupToggle, setDeleteConfimPopupToggle] = useState(false);

  const handleOnAddClick = (type: FsItemType) => {
    setInputData({ ...inputData, type, toggle: true });
  };

  const handleOnDeleteItems = () => {
    if (multipleItemsSelected.length) {
      const newRootFolder = deleteFilesAndFolders();
      setMachineQuestionDetails({
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
    <div className="flex items-center rounded-md rounded-b-none max-h-[100vh] ">
      <Image
        className="w-4"
        src={
          CREATE_PROJECT_OPTIONS[
            metaData.techStack === TechStack.React ? 'jsx' : 'js'
          ].icon
        }
        alt="app-logo"
      />
      <p className="text-[12px] ml-[6px] mr-[15px]">
        {
          CREATE_PROJECT_OPTIONS[
            metaData.techStack === TechStack.React ? 'jsx' : 'js'
          ].title
        }
      </p>
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
              setMachineQuestionDetails({
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

export default RightTabHeader;
