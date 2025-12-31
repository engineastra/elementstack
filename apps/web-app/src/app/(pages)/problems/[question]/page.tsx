'use client';
import React, {
  use,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
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
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

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
  const { windowSize } = useContext(SizeProviderContext);
  const { dsaProblemDetails, setDsaProblemDetails } = useContext(
    DsaProblemsDetailsContext
  );
  const [, loadQuestionInTransition] = useTransition();
  const { selectedLeftTab, selectedRightTab } = dsaProblemDetails;
  const [dividerLeft, setDividerLeft] = useState(40);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const onResize = (currLeft: number) => {
    if (leftRef.current && rightRef.current) {
      leftRef.current.style.width = currLeft + '%';
      rightRef.current.style.width = (100 - currLeft) + '%';
      setDividerLeft(currLeft);
    }
  };

  const resetResize = () => {
    if (leftRef.current && rightRef.current) {
      leftRef.current.style.width = '100%';
      rightRef.current.style.width = '100%';
    }
  };

  useEffect(() => {
    if (windowSize === DEVICE_SIZES.xsm || windowSize === DEVICE_SIZES.sm)
      resetResize();
  }, [windowSize]);

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
    <div
      ref={wrapperRef}
      className="flex flex-col md:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-2 bg-backgroundAccent md:overflow-hidden *:select-none"
    >
      <div
        ref={leftRef}
        className="flex flex-col rounded-xl border bg-card border-greenishgrey overflow-y-auto gap-2"
      >
        <LeftTab />
        {selectedLeftTab === DsaTabs.Desc.name && <Description />}
      </div>
      <HorizontalResizeDivider
        left={dividerLeft}
        min={30}
        max={70}
        windowRef={wrapperRef as React.RefObject<HTMLDivElement>}
        onResize={onResize}
      />
      <div ref={rightRef} className="flex flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
        <RightTab />
        {selectedRightTab === DsaTabs.Code.name && <DsaProblemEditor />}
      </div>
    </div>
  );
};

export default SingleQuestion;
