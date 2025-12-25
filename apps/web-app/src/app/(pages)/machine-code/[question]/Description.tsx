'use client';
import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { QuestionLevel } from '@elementstack/shared-assets/Types';
import { oxanium } from '@web-app/constants/Common';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import { useContext } from 'react';
import { MachineRightTabs } from '@elementstack/shared-assets/Enums';

const getLevelColor = (type: QuestionLevel) => {
  if (QuestionLevel.EASY === type) {
    return 'success';
  } else if (QuestionLevel.MEDIUM === type) {
    return 'warning';
  } else {
    return 'error';
  }
};

const Description = () => {
  const [hintExpand, setHintExpand] = useState(false);
  const [topicsExpand, setTopicsExpand] = useState(false);
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  return (
    <>
      <div className="flex flex-col w-full md:max-w-[400px] h-full p-4 gap-[20px] overflow-y-auto">
        <div className="flex h-fit w-full gap-2 justify-center items-center">
          <p
            className={`font-medium w-fit text-[20px] text-machine-500 ${oxanium.className}`}
          >
            {machineQuestionDetails.metaData.title}
          </p>
          <p
            className={`ml-auto w-fit text-[12px] text-${getLevelColor(
              machineQuestionDetails.metaData.level
            )} px-2 py-1 rounded-2xl border border-${getLevelColor(
              machineQuestionDetails.metaData.level
            )}`}
          >
            {machineQuestionDetails.metaData.level}
          </p>
        </div>
        <p className={`text-[14px] text-gray-300 text-justify`}>
          {machineQuestionDetails.metaData.detailedDescription}
        </p>
        <div
          className="flex shrink-0 w-full p-3 px-[15px] bg-backgroundAccent hover:bg-black rounded-xl justify-between items-center hover:scale-[101%] cursor-pointer"
          onClick={() =>
            setMachineQuestionDetails({
              payload: { selectedRightTab: MachineRightTabs.SolutionPreview },
            })
          }
        >
          <p className={`text-[14px] text-machine-500 text-justify`}>
            Solution Preview
          </p>
          <p className='text-[12px] text-machine-500 text-justify px-2 py-1 border border-machine-500 rounded-full bg-machine-500 bg-opacity-20'>Coming soon</p>
          {/* <OpenInNew
            sx={{ fontSize: 20, ...iconColor(COMMON_COLORS.machine[500]) }}
          /> */}
        </div>
        <div className="w-full mt-auto">
          <div
            className="flex justify-between items-center cursor-pointer mt-[20px]"
            onClick={() => setHintExpand(!hintExpand)}
          >
            <p
              className={`w-fit text-[13px] text-primaryText ${oxanium.className}`}
            >
              💡 Hints
            </p>
            {hintExpand ? (
              <ExpandLess sx={{ fontSize: 20 }} />
            ) : (
              <ExpandMore sx={{ fontSize: 20 }} />
            )}
          </div>
          {hintExpand && (
            <ul className="ml-4 mt-2">
              {machineQuestionDetails.metaData.hints.map((val: string) => {
                return (
                  <li
                    key={val}
                    className={`list-disc w-fit text-[13px] cursor-pointer text-secondaryText rounded-xl`}
                  >
                    {val}
                  </li>
                );
              })}
            </ul>
          )}
          <div
            className="flex justify-between items-center cursor-pointer mt-[15px]"
            onClick={() => setTopicsExpand(!topicsExpand)}
          >
            <p
              className={`w-fit text-[13px] text-primaryText ${oxanium.className}`}
            >
              📙 Topics
            </p>
            {topicsExpand ? (
              <ExpandLess sx={{ fontSize: 20 }} />
            ) : (
              <ExpandMore sx={{ fontSize: 20 }} />
            )}
          </div>
          {topicsExpand && (
            <div className="flex flex-wrap mt-4 gap-2">
              {machineQuestionDetails.metaData.keyFeatures.map(
                (val: string) => {
                  return (
                    <p
                      key={val}
                      className={`list-disc w-fit text-[13px] cursor-pointer px-2 py-1 text-machine-500 border border-machine-500 rounded-xl`}
                    >
                      {val}
                    </p>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
