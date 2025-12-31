'use client';
import { useContext } from 'react';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';
import { DsaTabs } from '@elementstack/shared-assets/Constants';

const LeftTab = () => {
  const { dsaProblemDetails, setDsaProblemDetails } = useContext(
    DsaProblemsDetailsContext
  );
  const { selectedLeftTab } = dsaProblemDetails;
  const options = Object.values(DsaTabs)
    .filter((value) => value.isLeft)
    .map((value) => value.name);
  return (
    <>
      <div className="flex shrink-0 w-full h-[40px] bg-pannel overflow-y-scroll">
        {options.map((value) => {
          return (
            <span
              key={value}
              className={`flex shrink-0 w-fit text-[12px] h-full justify-center items-center px-3 border-b cursor-pointer ${
                selectedLeftTab === value
                  ? 'border-b-problems-500 text-problems-500'
                  : 'border-b-transparent text-primaryText'
              }`}
              onClick={() =>
                setDsaProblemDetails({
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
