'use client';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { useContext } from 'react';
import {
  COMMON_COLORS,
  CREATE_PROJECT_OPTIONS,
} from '@elementstack/shared-assets/Constants';
import { TechStack } from '@elementstack/shared-assets/Enums';
import { ProjectType } from '@elementstack/shared-assets/Types';
import FileSystem from '@web-app/components/filesystem/FileSystem';

const MachineFileSection = () => {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { fsDetails, metaData } = machineQuestionDetails;
  const projectType = [
    TechStack.HTML5_JS_BASED,
    TechStack.VANILLA_JS_BASED,
  ].includes(metaData.techStack)
    ? ProjectType.js
    : ProjectType.jsx;
  return (
    <>
      <div className="flex flex-col w-full h-full gap-[20px] p-4 overflow-y-auto">
        <FileSystem
          initialFsData={fsDetails}
          colorTheme={COMMON_COLORS.machine[500]}
          title={CREATE_PROJECT_OPTIONS[projectType].title}
          icon={CREATE_PROJECT_OPTIONS[projectType].icon}
          onUpdateFsData={(data) => {
            setMachineQuestionDetails({ payload: { fsDetails: data } });
          }}
        />
      </div>
    </>
  );
};

export default MachineFileSection;
