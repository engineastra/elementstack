'use client';
import { MachineRightTabs } from '@elementstack/shared-assets/Enums';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { Fragment, useContext } from 'react';

const RightTab = () => {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { selectedRightTab } = machineQuestionDetails;
  return (
    <>
      <div className="flex shrink-0 w-full h-[40px] bg-pannel mr-[100px]">
        {Object.entries(MachineRightTabs).map(([key, value]) => {
          if (
            value === MachineRightTabs.SolutionPreview &&
            selectedRightTab != value
          )
            return <Fragment key={key} />;
          return (
            <span
              key={key}
              className={`flex text-[12px] h-full justify-center items-center px-3 border-b cursor-pointer ${
                selectedRightTab === value
                  ? 'border-b-machine-500 text-machine-500'
                  : 'border-b-transparent text-primaryText'
              }`}
              onClick={() =>
                setMachineQuestionDetails({
                  payload: { selectedRightTab: value },
                })
              }
            >
              {value}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default RightTab;
