'use client';
import { useContext, MouseEvent } from 'react';
import Image from 'next/image';
import { Close, InsertDriveFile as FileIcon } from '@mui/icons-material';
import {
  EmptyFile,
  FILE_TYPE_TO_ICON,
  PROJECT_THEME_BY_TYPE,
} from '@elementstack/shared-assets/Constants';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { FileData } from '@elementstack/shared-assets/Types';
import { iconColor } from '@web-app/utils/commonUtils';

const FilesTab = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { tabs, selectedFileId, multipleItemsSelected } = projectDetails;

  const onSelectFile = (fileObj: FileData) => {
    setProjectDetails({
      payload: {
        selectedFileId: fileObj.id,
        currentSelectedId: fileObj.id,
        multipleItemsSelected: [fileObj.id],
      },
    });
  };

  const onCloseFile = (e: MouseEvent, obj: FileData) => {
    e.stopPropagation();
    const newList = [...tabs].filter((file) => file != obj);
    if (obj.id === selectedFileId) {
      const newSelectedFile = newList.at(-1) || { ...EmptyFile };
      setProjectDetails({
        payload: {
          tabs: newList,
          selectedFileId: newSelectedFile.id,
          selectedFolderId: newSelectedFile.parentFolderId,
          currentSelectedId: newSelectedFile.id,
          multipleItemsSelected: newSelectedFile.id ? [newSelectedFile.id] : [],
        },
      });
    } else {
      setProjectDetails({
        payload: {
          tabs: newList,
          multipleItemsSelected: multipleItemsSelected.filter(
            (val) => val != obj.id
          ),
        },
      });
    }
  };

  return (
    <div className="flex pl-[40px] md:pl-[0px] h-[40px] min-h-[40px] w-full bg-pannel rounded-md rounded-b-none overflow-y-scroll">
      {tabs.map((obj: FileData) => {
        return (
          <button
            key={obj.id}
            data-type={obj.id}
            className={`flex flex-shrink-0 justify-between items-center gap-2 h-full w-fit px-2 py-1 border-b ${
              selectedFileId === obj.id
                ? 'border-b-primary'
                : 'border-b-transparent'
            }  border-r border-r-greenishgrey overflow-cli`}
            onClick={() => onSelectFile(obj)}
          >
            {FILE_TYPE_TO_ICON[obj.extention] ? (
              <Image
                src={FILE_TYPE_TO_ICON[obj.extention]}
                alt={obj.id}
                className="w-[15px] h-[12px]"
              />
            ) : (
              <FileIcon
                color="warning"
                sx={{
                  fontSize: 15,
                  ...iconColor(PROJECT_THEME_BY_TYPE[projectDetails.type].text),
                }}
              />
            )}
            <p
              className={`text-[12px] ${
                selectedFileId === obj.id ? 'text-primary' : 'text-white'
              }`}
            >
              {obj.name}
            </p>
            <Close sx={{ fontSize: 15 }} onClick={(e) => onCloseFile(e, obj)} />
          </button>
        );
      })}
    </div>
  );
};

export default FilesTab;
