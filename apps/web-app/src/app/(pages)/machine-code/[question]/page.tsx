'use client';
import React, { use, useContext, useEffect, useTransition } from 'react';
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
  const [, loadQuestionInTransition] = useTransition();
  const { metaData, rootFolder, selectedLeftTab, selectedRightTab } =
    machineQuestionDetails;

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
            .find((fld) => (fld.name = 'public'))
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
    <div className="relative flex flex-col md:flex-row w-full h-[100vh] md:max-h-[100vh] p-2 gap-2 bg-backgroundAccent">
      <div className="flex shrink-0 flex-col md:min-w-[250px] rounded-xl border bg-card border-greenishgrey overflow-y-auto md:overflow-hidden gap-2">
        <LeftTab />
        {selectedLeftTab === MachineLeftTabs.Desc && <Description />}
        {selectedLeftTab === MachineLeftTabs.FileSystem && <FilesSection />}
      </div>
      <div className="flex flex-1 flex-col rounded-xl min-h-[70vh] border bg-card border-greenishgrey overflow-hidden">
        <RightTab />
        {selectedRightTab === MachineRightTabs.Code && <MachineCodeEditor />}
        {selectedRightTab === MachineRightTabs.Preview && (
          <div className='h-full w-full'>
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
    </div>
  );
};

export default SingleQuestion;
