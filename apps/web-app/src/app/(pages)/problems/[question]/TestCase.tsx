'use client';
import { useContext } from 'react';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';

const TestCase = () => {
  const { dsaProblemDetails } = useContext(DsaProblemsDetailsContext);
  const { metaData } = dsaProblemDetails;
  const { testCases } = metaData;
  if (!testCases) return <></>;
  return (
    <>
      <div className="flex flex-col p-3 rounded-lg bg-pannel">
        {Object.entries(testCases).map(([key, value], idx) => {
          return (
            <div key={key} className="flex flex-col mb-2 *:text-[13px]">
              <p className="text-problems-500 font-semibold mb-1">
                Example {idx + 1}:
              </p>
              <div className='border-l-2 border-white ml-1 pl-2'>
                <p className="text-gray-300">
                  <span className="font-medium">Input:</span> {value.input}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Output:</span> {value.output}
                </p>
                <p className="text-gray-300">
                  <span className="font-medium">Explanation:</span>{' '}
                  {value.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TestCase;
