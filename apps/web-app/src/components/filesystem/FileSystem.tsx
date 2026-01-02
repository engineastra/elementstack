import { Folder, FsState } from '@elementstack/shared-assets/Types';
import { defaultStateReducer } from '@web-app/utils/commonUtils';
import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import FolderTree from './FolderTree';
import FsHeader from './FsHeader';

export const getFsInitData = (): FsState => {
  return {
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
};

const initialState: FsState = getFsInitData();

export const FsContext = createContext<{
  fsData: FsState;
  setFsData: Dispatch<{ payload: Partial<FsState> }>;
  deleteFilesAndFolders: (folder: Folder) => Folder;
}>({
  fsData: initialState,
  setFsData: () => {
    return;
  },
  deleteFilesAndFolders: (_: Folder) => {
    return _;
  },
});

const FileSystem = ({
  colorTheme,
  initialFsData,
  icon,
  title,
  onUpdateFsData,
}: {
  colorTheme: string;
  initialFsData: FsState;
  icon?: string;
  title?: string;
  onUpdateFsData: (data: FsState) => void;
}) => {
  const [state, dispatch] = useReducer<
    FsState,
    [action: { payload: Partial<FsState> }]
  >(defaultStateReducer, initialState);
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

  useEffect(() => {
    dispatch({ payload: initialFsData });
  }, []);

  return (
    <>
      <FsContext.Provider
        value={{ fsData: state, setFsData, deleteFilesAndFolders }}
      >
        <FsHeader icon={icon} title={title} />
        <FolderTree
          folder={rootFolder}
          colorTheme={colorTheme}
          onUpdateFsData={onUpdateFsData}
        />
      </FsContext.Provider>
    </>
  );
};

export default FileSystem;
