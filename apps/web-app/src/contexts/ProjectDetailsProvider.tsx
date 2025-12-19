'use client';
import {
  createContext,
  ReactNode,
  useReducer,
  Dispatch,
  useEffect,
} from 'react';
import {
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import {
  defaultStateReducer,
  setProjectsInLocalStorage,
} from '../utils/commonUtils';

const initialState: ProjectDetailsSchema = {
  id: '',
  name: '',
  type: '',
  openedFile: null,
  tabs: [],
  rootFolder: {
    id: '0',
    name: '',
    parentFolderId: '',
    totalItems: 0,
    isExpanded: true,
    files: [],
    folders: [],
  },
  currentSelectedId: '',
  selectedFileId: '',
  selectedFolderId: '',
  renameFileOrFolderObj: null,
  multipleItemsSelected: [],
  isPreviewOn: true,
  sideBarExpanded: true,
  newInputData: {
    isEnabled: false,
    type: undefined,
  },
};

export const ProjectDetailsInitialState = Object.freeze({ ...initialState });

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
  const [state, dispatch] = useReducer(
    defaultStateReducer<ProjectDetailsSchema, Partial<ProjectDetailsSchema>>,
    initialState
  );
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

  useEffect(() => {
    if (state.id) setProjectsInLocalStorage(state);
  }, [state]);

  const setProjectDetails = (action: {
    payload: Partial<ProjectDetailsSchema>;
  }) => {
    dispatch(action);
  };

  return (
    <ProjectDetailsContext.Provider
      value={{
        projectDetails: state,
        setProjectDetails,
        deleteFilesAndFolders,
      }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export default ProjectDetailsProvider;
