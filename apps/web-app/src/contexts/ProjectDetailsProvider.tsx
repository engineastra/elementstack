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
import { defaultStateReducer } from '../utils/commonUtils';
import { setProjectsInLocalStorage } from '@web-app/utils/projectUtils';
import { getFsInitData } from '@web-app/components/filesystem/FileSystem';

const initialState: ProjectDetailsSchema = {
  meta: { id: '', name: '', type: '' },
  fsDetails: getFsInitData(),
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
    deleteFilesAndFolders: (_: Folder | undefined) => {
      return undefined;
    },
  }
);

const ProjectDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    defaultStateReducer<ProjectDetailsSchema, Partial<ProjectDetailsSchema>>,
    initialState
  );
  const { multipleItemsSelected, rootFolder } = state.fsDetails;

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
    if (state.meta.id) setProjectsInLocalStorage(state);
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
