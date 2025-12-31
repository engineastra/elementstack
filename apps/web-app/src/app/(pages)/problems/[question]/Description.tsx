'use client';
import React from 'react';
import { QuestionLevel } from '@elementstack/shared-assets/Types';
import { oxanium } from '@web-app/constants/Common';
import { useContext } from 'react';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';
import TestCase from './TestCase';
import { COMMON_COLORS } from '@elementstack/shared-assets/Constants';
import Accordian from '@web-app/components/Accordian';

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
  const { dsaProblemDetails } = useContext(DsaProblemsDetailsContext);
  return (
    <>
      <div className="flex flex-col w-full md:max-w-[400px] h-full p-4 gap-[20px] overflow-y-auto">
        <div className="flex h-fit w-full gap-2 justify-center items-center">
          <p
            className={`font-medium w-fit text-[20px] text-problems-500 ${oxanium.className}`}
          >
            {dsaProblemDetails.metaData.title}
          </p>
          <p
            className={`ml-auto w-fit text-[12px] text-${getLevelColor(
              dsaProblemDetails.metaData.level
            )} px-2 py-1 rounded-2xl border border-${getLevelColor(
              dsaProblemDetails.metaData.level
            )}`}
          >
            {dsaProblemDetails.metaData.level}
          </p>
        </div>
        <p className={`text-[14px] text-gray-300 text-justify`}>
          {dsaProblemDetails.metaData.detailedDescription}
        </p>
        <TestCase />
        <div className="flex flex-col p-3 rounded-lg bg-pannel">
          <p className="text-[13px] text-problems-500 font-semibold mb-1">
            Contraints:
          </p>
          <ul className="list-disc ml-[15px]">
            {dsaProblemDetails.metaData.constraints.map((val) => (
              <li key={val} className="text-[12px]">
                {val}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full mt-auto">
          {dsaProblemDetails.metaData.hints.length && (
            <Accordian
              type="Bullet"
              title="💡 Hints"
              data={dsaProblemDetails.metaData.hints}
            />
          )}
          {dsaProblemDetails.metaData.keyConcepts.length && (
            <Accordian
              type="Chip"
              title="📙 Key Concepts"
              themeColor={COMMON_COLORS.problems[500]}
              data={dsaProblemDetails.metaData.keyConcepts}
            />
          )}
          {dsaProblemDetails.metaData.companyTags.length && (
            <Accordian
              type="Chip"
              title="💼 Companies"
              themeColor={COMMON_COLORS.problems[500]}
              data={dsaProblemDetails.metaData.companyTags}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
