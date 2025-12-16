import { FsItemType, SideBarOptions } from './Enums';

export type FileData = {
  id: string; // based on index + depth order + name
  name: string;
  type: string;
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
  parentFolderId: string;
};

export type ProjectDetailsSchema = {
  id: string;
  name: string;
  type: string;
  openedFile: FileData | null;
  tabs: Array<FileData>;
  rootFolder: Folder;
  selectedSideBarOption: SideBarOptions;
  currentSelectedId: string;
  selectedFile: FileData;
  selectedFolderId: string;
  renameFileOrFolderObj: FileData | Folder | null;
  multipleItemsSelected: Array<string>;
  newInputData: {
    isEnabled: boolean;
    type: FsItemType | undefined;
  };
};
