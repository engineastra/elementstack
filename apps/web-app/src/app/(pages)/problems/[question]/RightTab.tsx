'use client';
import { useContext } from 'react';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';
import { DsaTabs } from '@elementstack/shared-assets/Constants';

const RightTab = () => {
  const { dsaProblemDetails, setDsaProblemDetails } = useContext(
    DsaProblemsDetailsContext
  );
  const { selectedRightTab } = dsaProblemDetails;
  return (
    <>
      <div className="flex shrink-0 w-full h-[40px] bg-pannel mr-[100px] justify-start items-center">
        {Object.values(DsaTabs)
          .filter((value) => !value.isLeft)
          .map((value) => {
            return (
              <span
                key={value.name}
                className={`flex text-[12px] h-full justify-center items-center px-3 border-b cursor-pointer ${
                  selectedRightTab === value.name
                    ? 'border-b-problems-500 text-problems-500'
                    : 'border-b-transparent text-primaryText'
                }`}
                onClick={() =>
                  setDsaProblemDetails({
                    payload: { selectedRightTab: value.name },
                  })
                }
              >
                {value.name}
              </span>
            );
          })}
      </div>
    </>
  );
};

export default RightTab;
