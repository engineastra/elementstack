'use client';
import { MachineTabs } from '@elementstack/shared-assets/Enums';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { useContext } from 'react';

const Tab = () => {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { selectedLeftTab } = machineQuestionDetails;
  return (
    <>
      <div className="flex w-full h-[35px] bg-pannel mr-[100px]">
        {Object.entries(MachineTabs).map(([key, value]) => {
          return (
            <span
              key={key}
              className={`flex text-[12px] h-full justify-center items-center px-3 border-r border-r-greenishgrey border-b cursor-pointer ${
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

export default Tab;
