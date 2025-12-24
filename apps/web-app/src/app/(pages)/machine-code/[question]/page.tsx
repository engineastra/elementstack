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
import { Close } from '@mui/icons-material';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

async function getQuestionById(id: string) {
  const questions = (
    await import('@elementstack/shared-assets/50Questions.json')
  ).default;
  return questions.frontendMachineCodingQuestions.find((obj) => obj.id === id);
}

const SingleQuestion = ({
  params,
}: {
  params: Promise<{ question: string }>;
}) => {
  const paramObj = use(params);
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
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

  useEffect(() => {
    if (isTablet) {
      setIsHorzSplit(false);
      setIsVertSplit(false);
    }
  }, [isTablet]);

  useEffect(() => {
    loadQuestionInTransition(async () => {
      const quesObj = await getQuestionById(paramObj.question);
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
        const quesProjType =
          payload.metaData?.techStack === TechStack.React
            ? ProjectType.jsx
            : ProjectType.js;
        payload.rootFolder =
          getFolderTemplate(quesProjType, payload.metaData?.title || '') ||
          undefined;
        if (payload.rootFolder) {
          payload.rootFolder.isRoot = true;
          payload.rootFolder.isExpanded = true;
          const htmlFile = payload.rootFolder.folders
            .find((fld) => fld.name === 'public')
            ?.files.find((file) => file.name === 'index.html');
          if (htmlFile) {
            payload.selectedFileId = htmlFile.id;
            payload.treeItemSelectionId = htmlFile.id;
            payload.multipleItemsSelected = [];
          }
        }
        setMachineQuestionDetails({ payload });
      }
    });
  }, []);

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
              <SandboxPreview
                folder={rootFolder}
                type={
                  metaData?.techStack === TechStack.React
                    ? ProjectType.jsx
                    : ProjectType.js
                }
              />
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
              <SandboxPreview
                folder={rootFolder}
                type={
                  metaData?.techStack === TechStack.React
                    ? ProjectType.jsx
                    : ProjectType.js
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;
