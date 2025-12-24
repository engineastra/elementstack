import { FsItemType } from './Enums';

export type FileData = {
  id: string; // based on index + depth order + name
  name: string;
  extention: string;
  language: string;
  value: string;
  parentFolderId: string;
};

export type Folder = {
  id: string;
  name: string;
  files: Array<FileData>;
  folders: Array<Folder>;
  totalItems: number;
  isRoot?: boolean;
  isExpanded?: boolean;
  parentFolderId: string;
};

export type ProjectDetailsSchema = {
  id: string;
  name: string;
  type: string;
  openedFile: FileData | null;
  tabs: Array<FileData>;
  rootFolder: Folder;
  currentSelectedId: string;
  selectedFileId: string;
  selectedFolderId: string;
  renameFileOrFolderObj: FileData | Folder | null;
  multipleItemsSelected: Array<string>;
  isPreviewOn: boolean;
  sideBarExpanded: boolean;
  newInputData: {
    isEnabled: boolean;
    type: FsItemType | undefined;
  };
};

export enum ProjectType {
  'js' = 'js',
  'ts' = 'ts',
  'jsx' = 'jsx',
  'tsx' = 'tsx',
}

export enum QuestionLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export type MachineQuestionMeta = {
  id: string;
  title: string;
  techStack: string;
  level: QuestionLevel;
  quickDescription: string;
  detailedDescription: string;
  hints: Array<string>;
  solution?: Record<string, string>;
  keyFeatures: Array<string>;
  nextQuestions: {
    id: string;
    title: string;
    level: QuestionLevel;
  };
};

export type MachineQuestionData = {
  metaData: MachineQuestionMeta;
  solutionFiles: Array<FileData>;
};
