'use client';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { useContext } from 'react';
import MachineFolderTree from './MachineFileSystem';
import RightTabHeader from './RightTabHeader';

const FilesSection = () => {
  const { machineQuestionDetails } = useContext(MachineQuestionDetailsContext);
  const { rootFolder } = machineQuestionDetails;

  return (
    <>
      <div className="flex flex-col w-full h-full gap-[20px] p-4 overflow-y-auto">
        <RightTabHeader />
        <div>
          <MachineFolderTree folder={rootFolder} />
        </div>
      </div>
    </>
  );
};

export default FilesSection;
