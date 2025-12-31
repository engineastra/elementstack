'use client';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import { TechStack } from '@elementstack/shared-assets/Enums';
import { getFolderTemplate } from '@elementstack/shared-assets/Template';
import {
  FileData,
  MachineQuestionData,
  ProjectType,
  QuestionLevel,
} from '@elementstack/shared-assets/Types';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import { SandboxPreview } from '@web-app/components/Preview';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import Description from './(pages)/machine-code/[question]/Description';

const TodoListQuestionId = 'q1-todo-list-app';

async function getTodoListQuestionById() {
  const resp = await fetch(`/api/machine/question/${TodoListQuestionId}`);
  const question = await resp.json();
  if (!question) return null;
  return question;
}

const BannerData = {
  head: 'Machine Coding',
  title:
    'Tackle production-grade machine coding problems like Todo Lists, E-commerce carts, and complex dashboards. Filter by topic, difficulty (Easy/Medium/Hard) and solve in a full IDE-like virtual file system with real-time preview—exactly like live interviews.',
  features: [
    'Curated Challenges: Todo apps, infinite scroll, real-time search, drag & drop, charts, authentication flows.',
    'Difficulty Levels: Easy (basic CRUD) → Medium (filters/search) → Hard (performance/optimizations).',
    'Topic Filters: State Management, Performance, Forms, APIs, Animations, Accessibility.',
    'Real IDE Experience: Virtual file tree, multi-file editing, terminal simulation, live preview.',
    // 'Interview Simulation: 90-min timers, read-only problem specs, solution validation',
    // 'Code Quality Metrics: Performance scores, bundle size, accessibility checks.',
  ],
};

const MachineBanner = () => {
  const [questionData, setQuestionData] = useState<
    MachineQuestionData | undefined
  >();
  const [, loadQuestionInTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [selectedOption, setSelectedOption] = useState<
    'Problem' | 'Code' | 'Preview'
  >('Problem');

  useEffect(() => {
    loadQuestionInTransition(async () => {
      const quesObj = await getTodoListQuestionById();
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
        const rootFolder =
          getFolderTemplate(quesProjType, payload.metaData?.title || '') ||
          undefined;
        if (rootFolder) {
          payload.rootFolder = rootFolder;
          payload.rootFolder.isRoot = true;
          payload.rootFolder.isExpanded = true;
          const appJsxFile = payload.rootFolder.folders
            .find((fld) => fld.name === 'src')
            ?.files.find((file) => file.name === 'App.jsx');
          if (appJsxFile) {
            payload.selectedFileId = appJsxFile.id;
            payload.treeItemSelectionId = appJsxFile.id;
            payload.selectedFolderId = appJsxFile.parentFolderId;
            payload.multipleItemsSelected = [];
            setSelectedFile(appJsxFile);
          }
          setQuestionData(payload as MachineQuestionData);
        }
      }
    });
  }, []);

  const updateValue = (val: string) => {
    if (selectedFile) {
      selectedFile.value = val;
    }
    if (questionData) setQuestionData({ ...questionData });
  };

  const debouncedUpdateValue = debounce(updateValue, 200);

  if (!questionData) return <></>;

  return (
    <div className="relative flex flex-col lg:flex-row w-full px-[20px] min-h-[200px] p-[20px] items-center justify-around border border-machine-500 rounded-xl bg-opacity-10 overflow-hidden gap-[35px]">
      <div className="flex flex-col items-center justify-center h-full w-full lg:w-[35%] gap-[20px]">
        <Image
          className="w-[40px]"
          src={OPTION_CARDS['machine'].icon}
          alt="project banner image"
        />
        <p className="text-[22px] font-semibold text-machine-500 mt-[-10px]">
          {BannerData.head}
        </p>
        <p className="text-[14px] font-medium text-primaryText text-center">
          {BannerData.title}
        </p>
        <div className="flex flex-col w-full p-4 bg-pannel rounded-lg">
          <p className="text-[14px] font-semibold text-machine-500">Features</p>
          <ul className="*:text-[14px] list-disc pl-[20px]">
            {BannerData.features.map((val) => {
              return <li key={val}>{val}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className={`flex w-[85vw] lg:w-[70%] flex-col h-full min-h-[600px] items-center p-4 bg-card rounded-xl`}>
        <div className="flex w-full h-[35px] *:text-[13px] gap-2">
          <p
            className={`px-[10px] py-[3px] h-fit rounded-md cursor-pointer ${
              selectedOption === 'Problem'
                ? 'text-black bg-machine-500'
                : 'text-machine-500 border border-machine-500'
            }`}
            onClick={() => setSelectedOption('Problem')}
          >
            Problem
          </p>
          <p
            className={`px-[10px] py-[3px] h-fit rounded-md cursor-pointer ${
              selectedOption === 'Code'
                ? 'text-black bg-machine-500'
                : 'text-machine-500 border border-machine-500'
            }`}
            onClick={() => setSelectedOption('Code')}
          >
            Code
          </p>
          <p
            className={`px-[10px] py-[3px] h-fit rounded-md cursor-pointer ${
              selectedOption === 'Preview'
                ? 'text-black bg-machine-500'
                : 'text-machine-500 border border-machine-500'
            }`}
            onClick={() => setSelectedOption('Preview')}
          >
            Preview
          </p>
        </div>
        <div className="project-editor w-full h-[calc(100%-45px)] overflow-hidden mt-[10px]">
          {selectedOption === 'Problem' && (
            <Description
              questionDetails={questionData}
              setQuestionDetails={(data) => {
                setQuestionData({ ...questionData, ...data });
              }}
            />
          )}
          {selectedOption === 'Code' && selectedFile && (
            <CodemirrorEditor
              key={selectedOption}
              value={selectedFile.value}
              extention={selectedFile.extention}
              lineDecorationsWidth={20}
              fontSize={14}
              setValue={debouncedUpdateValue}
              width="100%"
              height="100%"
            />
          )}
          {selectedOption === 'Preview' && (
            <SandboxPreview
              folder={questionData.rootFolder}
              type={ProjectType.jsx}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineBanner;
