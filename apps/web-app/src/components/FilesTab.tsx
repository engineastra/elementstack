'use client';
import { useContext } from 'react';
import Image from 'next/image';
import closeSVG from '@elementstack/shared-assets/icons/close.svg';
import { FILE_TYPE_TO_ICON } from '@elementstack/shared-assets/Constants';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { FileData } from '@elementstack/shared-assets/Types';

const FilesTab = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { tabs: files } = projectDetails;

  const onCloseFile = (obj: FileData) => {
    const newList = [...files].filter((file) => file != obj);
    setProjectDetails({ payload: { tabs: newList } });
  };

  return (
    <div className="flex h-[30px] w-full bg-pannel rounded-md rounded-b-none overflow-y-scroll">
      {files.map((obj: FileData) => {
        return (
          <button
            key={obj.id}
            data-type={obj.id}
            className={`flex justify-between items-center gap-2 h-full w-fit max-w-[100px] px-2 py-1 border-b  border-r border-r-greenishgrey overflow-cli`}
          >
            <Image
              src={FILE_TYPE_TO_ICON[obj.type]}
              alt={obj.name}
              className="w-3 h-3"
            />
            <p className={`text-[12px] text-white`}>{obj.name}</p>
            <Image
              src={closeSVG}
              alt={obj.id}
              className="w-2 h-2 ml-2"
              onClick={() => onCloseFile(obj)}
            />
          </button>
        );
      })}
    </div>
  );
};

export default FilesTab;
