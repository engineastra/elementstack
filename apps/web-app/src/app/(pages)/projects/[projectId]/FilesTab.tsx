'use client';
import { useContext, MouseEvent } from 'react';
import Image from 'next/image';
import closeSVG from '@elementstack/shared-assets/icons/close.svg';
import fileSVG from '@elementstack/shared-assets/icons/file.svg';
import {
  EmptyFile,
  FILE_TYPE_TO_ICON,
} from '@elementstack/shared-assets/Constants';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { FileData } from '@elementstack/shared-assets/Types';

const FilesTab = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { tabs, selectedFile } = projectDetails;

  const onSelectFile = (fileObj: FileData) => {
    setProjectDetails({
      payload: {
        selectedFile: fileObj,
        currentSelectedId: fileObj.id,
        multipleItemsSelected: [fileObj.id],
      },
    });
  };

  const onCloseFile = (e: MouseEvent<HTMLImageElement>, obj: FileData) => {
    e.stopPropagation();
    const newList = [...tabs].filter((file) => file != obj);
    const newSelectedFile =
      obj.id === selectedFile.id
        ? newList.at(-1) || { ...EmptyFile }
        : selectedFile;
    setProjectDetails({
      payload: {
        tabs: newList,
        selectedFile: newSelectedFile,
        selectedFolderId: newSelectedFile.parentFolderId,
        currentSelectedId: newSelectedFile.id,
        multipleItemsSelected: newSelectedFile.id ? [newSelectedFile.id] : [],
      },
    });
  };

  return (
    <div className="flex h-[40px] min-h-[40px] w-full bg-pannel rounded-md rounded-b-none overflow-y-scroll">
      {tabs.map((obj: FileData) => {
        return (
          <button
            key={obj.id}
            data-type={obj.id}
            className={`flex flex-shrink-0 justify-between items-center gap-2 h-full w-fit px-2 py-1 border-b ${
              selectedFile.id === obj.id
                ? 'border-b-primary'
                : 'border-b-transparent'
            }  border-r border-r-greenishgrey overflow-cli`}
            onClick={() => onSelectFile(obj)}
          >
            <Image
              src={FILE_TYPE_TO_ICON[obj.type] || fileSVG}
              alt={obj.name}
              className="w-3 h-3"
            />
            <p
              className={`text-[12px] ${
                selectedFile.id === obj.id ? 'text-primary' : 'text-white'
              }`}
            >
              {obj.name}
            </p>
            <Image
              src={closeSVG}
              alt={obj.id}
              className="w-2 h-2 ml-2"
              onClick={(e) => onCloseFile(e, obj)}
            />
          </button>
        );
      })}
    </div>
  );
};

export default FilesTab;
