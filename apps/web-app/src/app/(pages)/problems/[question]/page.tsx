'use client';
import React, { use, useContext, useEffect, useTransition } from 'react';
import Description from './Description';
import {
  DsaProblemData,
  DsaProblemMeta,
} from '@elementstack/shared-assets/Types';
import LeftTab from './LeftTab';
import RightTab from './RightTab';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';
import DsaProblemEditor from './DsaProblemEditor';
import { DsaTabs } from '@elementstack/shared-assets/Constants';

async function getProblemById(id: string): Promise<DsaProblemMeta | null> {
  const resp = await fetch(`/api/dsa/problem/${id}`);
  const question = await resp.json();
  if (!question) return null;
  return question;
}

const SingleQuestion = ({
  params,
}: {
  params: Promise<{ question: string }>;
}) => {
  const paramObj = use(params);
  const { dsaProblemDetails, setDsaProblemDetails } = useContext(
    DsaProblemsDetailsContext
  );
  const [, loadQuestionInTransition] = useTransition();
  const { selectedLeftTab, selectedRightTab } = dsaProblemDetails;

  useEffect(() => {
    loadQuestionInTransition(async () => {
      const quesObj = await getProblemById(paramObj.question);
      // Error handling on no fetch
      if (quesObj) {
        const payload: Partial<DsaProblemData> = {
          metaData: quesObj,
        };
        setDsaProblemDetails({ payload });
      }
    });
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-2 bg-backgroundAccent md:overflow-hidden">
      <div className="flex shrink-0 flex-col md:min-w-[250px] rounded-xl border bg-card border-greenishgrey overflow-y-auto gap-2">
        <LeftTab />
        {selectedLeftTab === DsaTabs.Desc.name && <Description />}
      </div>

      <div className="flex flex-1 flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
        <RightTab />
        {selectedRightTab === DsaTabs.Code.name && <DsaProblemEditor />}
      </div>
    </div>
  );
};

export default SingleQuestion;
