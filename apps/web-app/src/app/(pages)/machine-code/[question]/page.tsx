'use client';
import React, {
  use,
  useContext,
  useEffect,
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
  const [isHorzSplit, setIsHorzSplit] = useState(true);
  const [isVertSplit, setIsVertSplit] = useState(false);
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
      setIsVertSplit(false);
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

  return (
    <div className="relative flex flex-col md:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-2 bg-backgroundAccent md:overflow-hidden">
      <div className="flex shrink-0 flex-col md:min-w-[250px] rounded-xl border bg-card border-greenishgrey overflow-y-auto gap-2">
        <LeftTab />
        {selectedLeftTab === MachineLeftTabs.Desc && <Description />}
        {selectedLeftTab === MachineLeftTabs.FileSystem && <FilesSection />}
      </div>

      {isHorzSplit || isVertSplit ? (
        <div
          className={`flex ${
            isVertSplit ? 'flex-col' : 'flex-row'
          } w-full h-full gap-2 overflow-y-auto`}
        >
          <div className="flex flex-1 flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
            <div className="flex shrink-0 w-full h-[40px] bg-pannel mr-[100px] text-machine-500 justify-center items-center text-[13px] border-b border-b-machine-500 font-semibold">
              {MachineRightTabs.Code}
            </div>
            <MachineCodeEditor />
          </div>
          <div className="flex flex-1 flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
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
                  setIsVertSplit(false);
                }}
              />
            </div>
            <div className="h-full w-full">
              <SandboxPreview folder={rootFolder} type={projectType} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
          <RightTab
            isTablet={isTablet}
            setIsHorzSplit={setIsHorzSplit}
            setIsVertSplit={setIsVertSplit}
          />
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
