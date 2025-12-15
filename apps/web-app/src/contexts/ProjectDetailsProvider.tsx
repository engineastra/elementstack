'use client';
import { createContext, ReactNode, useReducer, Dispatch } from 'react';
import {
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import { SideBarOptions } from '@elementstack/shared-assets/Enums';
import { defaultStateReducer } from '../utils/commonUtils';

const initialState: ProjectDetailsSchema = {
  id: '',
  name: '',
  openedFile: null,
  tabs: [],
  rootFolder: {
    id: '0',
    name: '',
    parentFolderId: '',
    totalItems: 0,
    files: [],
    folders: [],
  },
  selectedSideBarOption: SideBarOptions.FILES,
  currentSelectedId: '',
  selectedFile: {
    id: '',
    name: '',
    value: '',
    parentFolderId: '',
    type: '',
    language: '',
  },
  selectedFolderId: '',
  renameFileOrFolderObj: null,
  multipleItemsSelected: [],
  newInputData: {
    isEnabled: false,
    folderId: '',
    type: undefined,
  },
};

type ProjectDetailsContextSchema = {
  projectDetails: ProjectDetailsSchema;
  setProjectDetails: Dispatch<{ payload: Partial<ProjectDetailsSchema> }>;
  deleteFilesAndFolders: (currentFolder?: Folder) => Folder | undefined;
};

export const ProjectDetailsContext = createContext<ProjectDetailsContextSchema>(
  {
    projectDetails: initialState,
    setProjectDetails: () => {
      return;
    },
    deleteFilesAndFolders: () => {
      return;
    },
  }
);

const ProjectDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(defaultStateReducer, initialState);
  const { multipleItemsSelected, rootFolder } = state;

  const deleteFilesAndFolders = (currentFolder: Folder = rootFolder) => {
    const filteredFiles = currentFolder.files.filter(
      (file) => !multipleItemsSelected.includes(file.id)
    );
    const filteredFolders = currentFolder.folders.filter(
      (fld) => !multipleItemsSelected.includes(fld.id)
    );
    currentFolder.files = filteredFiles;
    currentFolder.folders = filteredFolders;
    currentFolder.folders.forEach((fld) => deleteFilesAndFolders(fld));
    return { ...currentFolder };
  };

  return (
    <ProjectDetailsContext.Provider
      value={{
        projectDetails: state,
        setProjectDetails: dispatch,
        deleteFilesAndFolders,
      }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export default ProjectDetailsProvider;
