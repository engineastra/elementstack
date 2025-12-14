import { SideBarOptions } from './Enums';

export type FileMetaData = {
  id: string; // based on index + depth order + name
  name: string;
  type: string;
};

export type Folder = {
  id: string;
  name: string;
  files: Array<FileMetaData>;
  folders: Array<Folder>;
  totalItems: number;
};

export type ProjectDetailsSchema = {
  id?: string;
  name?: string;
  openedFile: FileMetaData | null;
  tabs: Array<FileMetaData>;
  rootFolder: Folder;
  selectedSideBarOption: SideBarOptions;
  currentSelectedId: string;
  selectedFolder: string;
};
