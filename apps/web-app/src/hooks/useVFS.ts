// useVFS.ts
import { useReducer, useCallback } from 'react';
import { vfsReducer, VFSState } from '../utils/vfs';

const initialState: VFSState = {
  files: {},
  activeFile: null,
};

export const useVFS = (initialFiles?: Record<string, string>) => {
  const [state, dispatch] = useReducer(vfsReducer, {
    ...initialState,
    files: initialFiles ?? {},
  });

  const openFile = useCallback((path: string) => {
    dispatch({ type: 'OPEN_FILE', path });
  }, []);

  const updateFile = useCallback((path: string, newCode: string) => {
    dispatch({ type: 'UPDATE_FILE', path, content: newCode });
  }, []);

  const addFile = useCallback((path: string, content = '') => {
    dispatch({ type: 'ADD_FILE', path, content });
  }, []);

  return {
    vfs: state,
    openFile,
    updateFile,
    addFile,
  };
};