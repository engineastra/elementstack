'use client';
import { useContext } from 'react';
import { MachineLeftTabs } from '@elementstack/shared-assets/Enums';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';

const LeftTab = () => {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { selectedLeftTab } = machineQuestionDetails;
  const options = Object.entries(MachineLeftTabs);
  return (
    <>
      <div className="flex shrink-0 w-full h-[40px] bg-pannel overflow-y-scroll">
        {options.map(([key, value], idx) => {
          return (
            <span
              key={key}
              className={`flex shrink-0 w-fit text-[12px] h-full justify-center items-center px-3 border-b cursor-pointer ${
                selectedLeftTab === value
                  ? 'border-b-machine-500 text-machine-500'
                  : 'border-b-transparent text-primaryText'
              }`}
              onClick={() =>
                setMachineQuestionDetails({
                  payload: { selectedLeftTab: value },
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

export default LeftTab;
