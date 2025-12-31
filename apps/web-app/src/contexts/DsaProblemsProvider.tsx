'use client';
import { createContext, ReactNode, useReducer, Dispatch } from 'react';
import {
  DsaProblemData,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import { defaultStateReducer } from '../utils/commonUtils';
import { DsaTabs } from '@elementstack/shared-assets/Constants';

const initialState: DsaProblemData = {
  metaData: {
    id: '',
    title: '',
    level: QuestionLevel.EASY,
    category: '',
    subcategory: '',
    quickDescription: '',
    detailedDescription: '',
    testCases: {},
    companyTags: [],
    constraints: [],
    hints: [],
    similarProblems: [],
    timeEstimate: '',
    relatedTopics: [],
    solution: {},
    keyConcepts: [],
  },
  values: {},
  selectedLeftTab: DsaTabs.Desc.name,
  selectedRightTab: DsaTabs.Code.name,
};

export const DsaProblemsInitialState = Object.freeze({
  ...initialState,
});

type DsaProblemsDetailsContextSchema = {
  dsaProblemDetails: DsaProblemData;
  setDsaProblemDetails: Dispatch<{
    payload: Partial<DsaProblemData>;
  }>;
};

export const DsaProblemsDetailsContext =
  createContext<DsaProblemsDetailsContextSchema>({
    dsaProblemDetails: initialState,
    setDsaProblemDetails: () => {
      return;
    },
  });

const DsaProblemsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    defaultStateReducer<DsaProblemData, Partial<DsaProblemData>>,
    initialState
  );

  const setDsaProblemDetails = (action: {
    payload: Partial<DsaProblemData>;
  }) => {
    dispatch(action);
  };

  return (
    <DsaProblemsDetailsContext.Provider
      value={{
        dsaProblemDetails: state,
        setDsaProblemDetails,
      }}
    >
      {children}
    </DsaProblemsDetailsContext.Provider>
  );
};

export default DsaProblemsProvider;
