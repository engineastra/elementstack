'use client';
import React, {
  use,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';
import Description from './Description';
import {
  MachineQuestionData,
  ProjectType,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import LeftTab from './LeftTab';
import {
  MachineLeftTabs,
  MachineRightTabs,
  TechStack,
} from '@elementstack/shared-assets/Enums';
import RightTab from './RightTab';
import FilesSection from './FilesSection';
import { getFolderTemplate } from '@elementstack/shared-assets/Template';
import MachineCodeEditor from './MachineCodeEditor';
import { SandboxPreview } from '@web-app/components/Preview';
import { Close, OpenInNew } from '@mui/icons-material';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { FullPreviewContext } from '@web-app/contexts/FullPreviewProvider';
import { useRouter } from 'next/navigation';
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';

async function getQuestionById(id: string) {
  const resp = await fetch(`/api/machine/question/${id}`);
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
  const router = useRouter();
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { setFullPreviewData } = useContext(FullPreviewContext);
  const { windowSize } = useContext(SizeProviderContext);
  const isTablet = [
    DEVICE_SIZES.xsm,
    DEVICE_SIZES.sm,
    DEVICE_SIZES.md,
  ].includes(windowSize);
  const [dividerMain, setDividerMain] = useState(33);
  const [dividerRightSec, setDividerRightSec] = useState(50);
  const mainWindowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isHorzSplit, setIsHorzSplit] = useState(true);
  const [, loadQuestionInTransition] = useTransition();
  const { metaData, rootFolder, selectedLeftTab, selectedRightTab } =
    machineQuestionDetails;
  const projectType = [
    TechStack.HTML5_JS_BASED,
    TechStack.VANILLA_JS_BASED,
  ].includes(metaData.techStack)
    ? ProjectType.js
    : ProjectType.jsx;

  useEffect(() => {
    if (isTablet) {
      setIsHorzSplit(false);
    }
  }, [isTablet]);

  useEffect(() => {
    loadQuestionInTransition(async () => {
      const quesObj = await getQuestionById(paramObj.question);
      // Error handling on no fetch
      if (quesObj) {
        const payload: Partial<MachineQuestionData> = {
          metaData: {
            id: quesObj.id,
            title: quesObj.title,
            techStack: quesObj.techStack as TechStack,
            level: quesObj.level as QuestionLevel,
            quickDescription: quesObj.quickDescription,
            detailedDescription: quesObj.detailedDescription,
            hints: quesObj.hints,
            keyFeatures: quesObj.keyFeatures,
          },
        };
        const quesProjType = [
          TechStack.HTML5_JS_BASED,
          TechStack.VANILLA_JS_BASED,
        ].includes(payload.metaData?.techStack as TechStack)
          ? ProjectType.js
          : ProjectType.jsx;
        payload.rootFolder =
          getFolderTemplate(quesProjType, payload.metaData?.title || '') ||
          undefined;
        if (payload.rootFolder) {
          payload.rootFolder.isRoot = true;
          payload.rootFolder.isExpanded = true;
          const htmlFile = payload.rootFolder.folders
            .find((fld) => fld.name === 'public' || fld.name === 'src')
            ?.files.find((file) => file.name === 'index.html');
          if (htmlFile) {
            payload.selectedFileId = htmlFile.id;
            payload.treeItemSelectionId = htmlFile.id;
            payload.selectedFolderId = htmlFile.parentFolderId;
            payload.multipleItemsSelected = [];
          }
        }
        setMachineQuestionDetails({ payload });
      }
    });
  }, []);

  const onFullPagePreviewClick = () => {
    setFullPreviewData({
      folder: rootFolder,
      type: projectType,
    });
    router.push('/webpreview');
  };

  const onResizeMain = (currPos: number) => {
    if (leftRef.current && rightRef.current) {
      leftRef.current.style.width = currPos + '%';
      rightRef.current.style.width = 100 - currPos + '%';
      setDividerMain(currPos);
    }
  };

  const onResizeRightSec = (currPos: number) => {
    if (codeRef.current && previewRef.current) {
      codeRef.current.style.width = currPos + '%';
      previewRef.current.style.width = 100 - currPos + '%';
      setDividerRightSec(currPos);
    }
  };

  useEffect(() => {
    if (isTablet) {
      if (leftRef.current) leftRef.current.style.width = '100%';
      if (rightRef.current) rightRef.current.style.width = '100%';
    } else {
      onResizeMain(33);
      onResizeRightSec(50);
    }
  }, [isTablet, codeRef.current]);

  return (
    <div
      ref={mainWindowRef}
      className="relative flex flex-col lg:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-1 bg-backgroundAccent md:overflow-hidden"
    >
      <div
        ref={leftRef}
        className="flex shrink-0 flex-col md:min-w-[250px] rounded-xl border bg-card border-greenishgrey overflow-y-auto gap-2"
      >
        <LeftTab />
        {selectedLeftTab === MachineLeftTabs.Desc && (
          <Description
            questionDetails={machineQuestionDetails}
            setQuestionDetails={(quesData) => {
              setMachineQuestionDetails({ payload: quesData });
            }}
          />
        )}
        {selectedLeftTab === MachineLeftTabs.FileSystem && <FilesSection />}
      </div>
      {!isTablet && (
        <HorizontalResizeDivider
          left={dividerMain}
          max={60}
          windowRef={mainWindowRef as React.RefObject<HTMLDivElement>}
          onResize={onResizeMain}
        />
      )}
      {isHorzSplit ? (
        <div
          ref={rightRef}
          className={`flex w-full h-full gap-1 overflow-y-auto`}
        >
          <div
            ref={codeRef}
            className="flex flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden"
          >
            <div className="flex shrink-0 w-full h-[40px] bg-pannel mr-[100px] text-machine-500 justify-center items-center text-[13px] border-b border-b-machine-500 font-semibold">
              {MachineRightTabs.Code}
            </div>
            <MachineCodeEditor />
          </div>
          <HorizontalResizeDivider
            left={dividerRightSec}
            min={35}
            max={65}
            windowRef={rightRef as React.RefObject<HTMLDivElement>}
            onResize={onResizeRightSec}
          />
          <div
            ref={previewRef}
            className="flex flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden"
          >
            <div className="relative flex shrink-0 w-full h-[40px] bg-pannel mr-[100px] text-machine-500 justify-center items-center text-[13px] border-b border-b-machine-500 font-semibold">
              <p className="text-[13px] text-machine-500 font-semibold">
                {MachineRightTabs.Preview}
              </p>
              <OpenInNew
                sx={{
                  fontSize: 15,
                  position: 'absolute',
                  right: 30,
                  cursor: 'pointer',
                }}
                onClick={onFullPagePreviewClick}
              />
              <Close
                sx={{
                  fontSize: 15,
                  position: 'absolute',
                  right: 10,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setIsHorzSplit(false);
                }}
              />
            </div>
            <div className="h-full w-full">
              <SandboxPreview folder={rootFolder} type={projectType} />
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={rightRef}
          className="flex w-full flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden"
        >
          <RightTab isTablet={isTablet} setIsHorzSplit={setIsHorzSplit} />
          {selectedRightTab === MachineRightTabs.Code && <MachineCodeEditor />}
          {selectedRightTab === MachineRightTabs.Preview && (
            <div className="h-full w-full">
              <SandboxPreview folder={rootFolder} type={projectType} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
