'use client';
import { createContext, ReactNode, useReducer, Dispatch } from 'react';
import {
  Folder,
  MachineQuestionData,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import { defaultStateReducer } from '../utils/commonUtils';
import {
  MachineLeftTabs,
  MachineRightTabs,
  TechStack,
} from '@elementstack/shared-assets/Enums';

const initialState: MachineQuestionData = {
  metaData: {
    id: '',
    title: '',
    techStack: TechStack.VanilaJS,
    level: QuestionLevel.EASY,
    quickDescription: '',
    detailedDescription: '',
    hints: [],
    solution: {},
    keyFeatures: [],
    nextQuestions: {
      id: '',
      title: '',
      level: QuestionLevel.EASY,
    },
  },
  solutionFiles: [],
  selectedLeftTab: MachineLeftTabs.Desc,
  selectedRightTab: MachineRightTabs.Code,
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
};

export const MachineQuestionDetailsInitialState = Object.freeze({
  ...initialState,
});

type MachineQuestionDetailsContextSchema = {
  machineQuestionDetails: MachineQuestionData;
  setMachineQuestionDetails: Dispatch<{
    payload: Partial<MachineQuestionData>;
  }>;
  deleteFilesAndFolders: (currentFolder?: Folder) => Folder | undefined;
};

export const MachineQuestionDetailsContext =
  createContext<MachineQuestionDetailsContextSchema>({
    machineQuestionDetails: initialState,
    setMachineQuestionDetails: () => {
      return;
    },
    deleteFilesAndFolders: () => {
      return;
    },
  });

const MachineQuestionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    defaultStateReducer<MachineQuestionData, Partial<MachineQuestionData>>,
    initialState
  );
  const { multipleItemsSelected, rootFolder } = state;

  const setMachineQuestionDetails = (action: {
    payload: Partial<MachineQuestionData>;
  }) => {
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
    <MachineQuestionDetailsContext.Provider
      value={{
        machineQuestionDetails: state,
        setMachineQuestionDetails,
        deleteFilesAndFolders,
      }}
    >
      {children}
    </MachineQuestionDetailsContext.Provider>
  );
};

export default MachineQuestionProvider;
