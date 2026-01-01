'use client';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import { getFolderTemplate } from '@elementstack/shared-assets/Template';
import { Folder, ProjectType } from '@elementstack/shared-assets/Types';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import { SandboxPreview } from '@web-app/components/Preview';
import { getFileById } from '@web-app/utils/projectUtils';
import { debounce } from 'lodash';
import Image from 'next/image';
import { useState } from 'react';

const BannerData = {
  head: 'Project',
  title:
    'Supercharge your frontend interview prep with an interactive coding workspace designed for hands-on learning. Build real-world UI projects across HTML/CSS/JS, React, and more-all in one seamless environment.',
  features: [
    'Instant Coding Sandbox: Write, edit, and run code directly in your browser with a fully functional virtual file system.',
    'Pre-Built Boilerplates: Start quickly with ready-to-use templates for popular frameworks — no setup or configuration needed.',
    'Real-Time Preview: See your changes live as you type, just like in your local dev environment.',
    'Framework Flexibility: Switch between vanilla JavaScript or modern frameworks to simulate real interview scenarios.',
    'Project-Based Learning: Work on curated frontend challenges that help you build a strong portfolio and sharpen practical skills.',
  ],
};

const ProjectBanner = () => {
  const [demoFolder, setDemoFolder] = useState<Folder | null>(
    getFolderTemplate(ProjectType.jsx, 'demo project')
  );
  if (!demoFolder) return <></>;
  const selectedFile = getFileById('020:App.jsx', demoFolder);
  const [selectedOption, setSelectedOption] = useState<'Code' | 'Preview'>(
    'Preview'
  );

  const updateValue = (val: string) => {
    if (selectedFile) {
      selectedFile.value = val;
    }
    setDemoFolder({ ...demoFolder });
  };

  const debouncedUpdateValue = debounce(updateValue, 200);

  return (
    <div className="relative flex flex-col lg:flex-row w-full px-[20px] min-h-[200px] p-[20px] items-center justify-around border border-project-500 rounded-xl bg-opacity-10 overflow-hidden gap-[35px] bg-card">
      <div className="flex flex-col items-center justify-center h-full w-full lg:w-[35%] gap-[20px]">
        <Image
          className="w-[40px] rotate-[-15deg]"
          src={OPTION_CARDS['project'].icon}
          alt="project banner image"
        />
        <p className="text-[22px] font-semibold text-project-500 mt-[-10px]">
          {BannerData.head}
        </p>
        <p className="text-[14px] font-medium text-primaryText text-center">
          {BannerData.title}
        </p>
        <div className="flex flex-col w-full p-4 bg-pannel rounded-lg">
          <p className="text-[14px] font-semibold text-project-500">Features</p>
          <ul className="*:text-[14px] list-disc pl-[20px]">
            {BannerData.features.map((val) => {
              return <li key={val}>{val}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="flex w-[85vw] lg:w-[70%] flex-col h-[600px] min-h-[600px] items-center p-4 bg-card rounded-xl">
        <div className="flex w-full h-[35px] *:text-[13px] gap-2">
          <p
            className={`px-[10px] py-[3px] h-fit rounded-md cursor-pointer ${
              selectedOption === 'Code'
                ? 'text-black bg-project-500'
                : 'text-project-500 border border-project-500'
            }`}
            onClick={() => setSelectedOption('Code')}
          >
            Code
          </p>
          <p
            className={`px-[10px] py-[3px] h-fit rounded-md cursor-pointer ${
              selectedOption === 'Preview'
                ? 'text-black bg-project-500'
                : 'text-project-500 border border-project-500'
            }`}
            onClick={() => setSelectedOption('Preview')}
          >
            Preview
          </p>
        </div>
        <div className="project-editor w-full h-[calc(100%-45px)] overflow-hidden mt-[10px]">
          {selectedOption === 'Code' ? (
            selectedFile && (
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
            )
          ) : (
            <SandboxPreview
              key="demo-folder"
              folder={demoFolder}
              type={ProjectType.jsx}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectBanner;
