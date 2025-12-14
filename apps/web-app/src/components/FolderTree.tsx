import { FILE_TYPE_TO_ICON } from '@elementstack/shared-assets/Constants';
import {
  FileMetaData,
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import fileSvg from '@elementstack/shared-assets/icons/file.svg';
import folderSvg from '@elementstack/shared-assets/icons/folder.svg';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { ProjectDetailsContext } from '../contexts/ProjectDetailsProvider';
import { FsItemType } from '@elementstack/shared-assets/Enums';

const FolderTree = ({ folder }: { folder: Folder }) => {
  const [expanded, setExpanded] = useState(false);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { currentSelectedId } = projectDetails;

  const handleFileOrFolderSelection = (
    id: string,
    type: FsItemType,
    parentFolderId?: string
  ) => {
    const payload: Partial<ProjectDetailsSchema> = { currentSelectedId: id };
    if (type === FsItemType.FOLDER) {
      setExpanded((prev) => !prev);
      payload.selectedFolder = id;
    } else {
      payload.selectedFolder = parentFolderId;
    }
    setProjectDetails({ payload });
  };

  return (
    <div className="flex flex-col">
      <div
        className="flex gap-2 pt-1 cursor-pointer"
        onClick={() =>
          handleFileOrFolderSelection(folder.id, FsItemType.FOLDER)
        }
      >
        <Image src={folderSvg} alt={folder.name} />
        <p
          className={`text-[12px] ${
            currentSelectedId === folder.id ? 'text-primary' : ''
          }`}
        >
          {folder.name}
        </p>
      </div>
      {expanded && (
        <div className="pl-4">
          {folder.folders.map((subFolder) => {
            return <FolderTree key={subFolder.id} folder={subFolder} />;
          })}
          {folder.files.map((file: FileMetaData) => {
            return (
              <div
                key={file.id}
                className="flex gap-2 pt-1 cursor-pointer"
                onClick={() =>
                  handleFileOrFolderSelection(
                    file.id,
                    FsItemType.FILE,
                    folder.id
                  )
                }
              >
                <Image
                  src={FILE_TYPE_TO_ICON[file.type] || fileSvg}
                  alt={file.id}
                  className="w-3"
                />
                <p
                  className={`text-[12px] ${
                    currentSelectedId === file.id ? 'text-primary' : ''
                  }`}
                >
                  {file.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FolderTree;
