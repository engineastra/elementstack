import { FsItemType } from '@elementstack/shared-assets/Enums';
import { Folder } from '@elementstack/shared-assets/Types';
import { defaultStateReducer } from '@web-app/utils/commonUtils';
import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';

export type FsState = {
  rootFolder: Folder;
  selectedFolderId: string;
  selectedFileId: string;
  treeItemSelectionId: string;
  multipleItemsSelected: Array<string>;
  nameChangeInputData: {
    id: string;
    type: FsItemType | '';
    toggle: boolean;
    isNew: boolean;
  };
};

const initialState: FsState = {
  rootFolder: {
    id: '0',
    name: '',
    parentFolderId: '',
    totalItems: 0,
    isExpanded: true,
    files: [],
    folders: [],
  },
  selectedFileId: '',
  selectedFolderId: '',
  treeItemSelectionId: '',
  multipleItemsSelected: [],
  nameChangeInputData: {
    id: '',
    type: '',
    toggle: false,
    isNew: true,
  },
};

export const FsContext = createContext<{
  fsData: FsState;
  setFsData: Dispatch<{ payload: Partial<FsState> }>;
  deleteFilesAndFolders: (folder: Folder) => void;
}>({
  fsData: initialState,
  setFsData: () => {
    return;
  },
  deleteFilesAndFolders: (_: Folder) => {
    return;
  },
});

const FileSystemRootLayout = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(defaultStateReducer, initialState);
  const { multipleItemsSelected, rootFolder } = state;

  const setFsData = (action: { payload: Partial<FsState> }) => {
    dispatch(action);
  };

  const deleteFilesAndFolders = (currentFolder: Folder = rootFolder) => {
    const filteredFiles = currentFolder.files.filter(
      (file) => !multipleItemsSelected.includes(file.id) || !file.canBeRemoved
    );
    const filteredFolders = currentFolder.folders.filter(
      (fld) => !multipleItemsSelected.includes(fld.id) || !fld.canBeRemoved
    );
    currentFolder.files = filteredFiles;
    currentFolder.folders = filteredFolders;
    currentFolder.folders.forEach((fld) => deleteFilesAndFolders(fld));
    return { ...currentFolder };
  };

  return (
    <>
      <FsContext.Provider
        value={{ fsData: state, setFsData, deleteFilesAndFolders }}
      >
        {children}
      </FsContext.Provider>
    </>
  );
};

export default FileSystemRootLayout;
