'use client';
import { createContext, ReactNode, useReducer, Dispatch } from 'react';
import {
  MachineQuestionData,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import { defaultStateReducer } from '../utils/commonUtils';
import { MachineTabs, TechStack } from '@elementstack/shared-assets/Enums';

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
  selectedLeftTab: MachineTabs.Desc,
  selectedRightTab: undefined,
};

export const MachineQuestionDetailsInitialState = Object.freeze({
  ...initialState,
});

type MachineQuestionDetailsContextSchema = {
  machineQuestionDetails: MachineQuestionData;
  setMachineQuestionDetails: Dispatch<{
    payload: Partial<MachineQuestionData>;
  }>;
};

export const MachineQuestionDetailsContext =
  createContext<MachineQuestionDetailsContextSchema>({
    machineQuestionDetails: initialState,
    setMachineQuestionDetails: () => {
      return;
    },
  });

const MachineQuestionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    defaultStateReducer<MachineQuestionData, Partial<MachineQuestionData>>,
    initialState
  );

  const setMachineQuestionDetails = (action: {
    payload: Partial<MachineQuestionData>;
  }) => {
    dispatch(action);
  };

  return (
    <MachineQuestionDetailsContext.Provider
      value={{
        machineQuestionDetails: state,
        setMachineQuestionDetails,
      }}
    >
      {children}
    </MachineQuestionDetailsContext.Provider>
  );
};

export default MachineQuestionProvider;
