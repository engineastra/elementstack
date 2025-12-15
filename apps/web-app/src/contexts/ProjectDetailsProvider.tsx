'use client';
import { createContext, ReactNode, useReducer, Dispatch } from 'react';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
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
  selectedFolder: '',
  newInputData: {
    isEnabled: false,
    folderId: '',
    type: undefined,
  },
};

type ProjectDetailsContextSchema = {
  projectDetails: ProjectDetailsSchema;
  setProjectDetails: Dispatch<{ payload: Partial<ProjectDetailsSchema> }>;
};

export const ProjectDetailsContext = createContext<ProjectDetailsContextSchema>(
  {
    projectDetails: initialState,
    setProjectDetails: () => {
      return;
    },
  }
);

const ProjectDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(defaultStateReducer, initialState);
  return (
    <ProjectDetailsContext.Provider
      value={{ projectDetails: state, setProjectDetails: dispatch }}
    >
      {children}
    </ProjectDetailsContext.Provider>
  );
};

export default ProjectDetailsProvider;
