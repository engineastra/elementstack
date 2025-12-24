'use client';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { useContext, useState } from 'react';
import MachineFolderTree from './MachineFileSystem';
import { FsItemType } from '@elementstack/shared-assets/Enums';
import RightTabHeader from './RightTabHeader';

export type InputType = {
  id: string;
  type: FsItemType | '';
  toggle: boolean;
  isNew: boolean;
};

const FilesSection = () => {
  const { machineQuestionDetails } = useContext(MachineQuestionDetailsContext);
  const { rootFolder } = machineQuestionDetails;
  const [inputData, setInputData] = useState<InputType>({
    id: '',
    type: '',
    toggle: false,
    isNew: true,
  });

  return (
    <>
      <div className="flex flex-col w-full h-full gap-[20px] p-4 overflow-y-auto">
        <RightTabHeader inputData={inputData} setInputData={setInputData} />
        <div>
          <MachineFolderTree
            folder={rootFolder}
            inputData={inputData}
            setInputData={setInputData}
          />
        </div>
      </div>
    </>
  );
};

export default FilesSection;
