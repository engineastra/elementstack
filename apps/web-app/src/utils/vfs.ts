// vfs.types.ts
export type FilePath = string;

export interface VFSFile {
  path: FilePath;
  content: string;
}

export interface VFSState {
  files: Record<FilePath, string>;
  activeFile: FilePath | null;
}

// vfs.actions.ts
export type VFSAction =
  | { type: 'OPEN_FILE'; path: string }
  | { type: 'UPDATE_FILE'; path: string; content: string }
  | { type: 'ADD_FILE'; path: string; content: string };

export const vfsReducer = (state: VFSState, action: VFSAction): VFSState => {
  switch (action.type) {
    case 'OPEN_FILE': {
      if (!state.files[action.path]) return state;

      return {
        ...state,
        activeFile: action.path,
      };
    }

    case 'UPDATE_FILE': {
      if (!state.files[action.path]) return state;

      return {
        ...state,
        files: {
          ...state.files,
          [action.path]: action.content,
        },
      };
    }

    case 'ADD_FILE': {
      if (state.files[action.path]) return state;

      return {
        ...state,
        files: {
          ...state.files,
          [action.path]: action.content,
        },
      };
    }

    default:
      return state;
  }
};
