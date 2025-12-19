'use client';
import { ProjectType } from '@elementstack/shared-assets/Types';
import Editor from '@web-app/components/Editor';
import { SandboxPreview } from '@web-app/components/Preview';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import closeSVG from '@elementstack/shared-assets/icons/close.svg';
import { getFileById } from '@web-app/utils/commonUtils';
import { useContext, useRef, useState } from 'react';
import FilesTab from './FilesTab';
import Image from 'next/image';
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';

function ProjectEditorSection({ selectedFileId }: { selectedFileId: string }) {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const [dividerLeft, setDividerLeft] = useState(50);
  const { rootFolder, isPreviewOn } = projectDetails;
  const fileObj = getFileById(selectedFileId, rootFolder);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateValue = (val: string) => {
    if (fileObj) {
      fileObj.value = val;
      setProjectDetails({ payload: { rootFolder: { ...rootFolder } } });
    }
  };

  const onResize = (currLeft: number) => {
    if (editorRef.current && previewRef.current) {
      editorRef.current.style.width = `calc(${currLeft + '%'})`;
      previewRef.current.style.width = `calc(${100 - currLeft + '%'})`;
      setDividerLeft(currLeft);
    }
  };

  // const resetResize = () => {
  //   if (editorRef.current && previewRef.current) {
  //     editorRef.current.style.width = 'inherit';
  //     previewRef.current.style.width = 'inherit';
  //   }
  // };

  return (
    <div
      className="flex flex-row h-full w-full min-w-0 gap-1 justify-between *:select-none"
      ref={wrapperRef}
    >
      <div
        ref={editorRef}
        className={`flex flex-col ${isPreviewOn ? '' : 'flex-1'}`}
      >
        <FilesTab />
        {selectedFileId && fileObj && (
          <div className="flex flex-1 bg-card pl-2 pt-2 rounded-b-md">
            <Editor
              key={`${isPreviewOn}`}
              value={fileObj.value}
              selectedLanguageuage={fileObj.language}
              lineDecorationsWidth={20}
              fontSize={14}
              setValue={updateValue}
            />
          </div>
        )}
      </div>

      {isPreviewOn && (
        <>
          <HorizontalResizeDivider
            left={dividerLeft}
            min={30}
            max={80}
            onResize={onResize}
            windowRef={wrapperRef as React.RefObject<HTMLDivElement>}
          />
          <div ref={previewRef} className="flex flex-col">
            <div className="relative flex h-[40px] min-h-[40px] w-full bg-pannel rounded-md rounded-b-none items-center justify-center">
              <p>Preview</p>
              <Image
                src={closeSVG}
                alt="close preview"
                className="absolute right-4 cursor-pointer"
                onClick={() =>
                  setProjectDetails({ payload: { isPreviewOn: false } })
                }
              />
            </div>
            <SandboxPreview
              folder={rootFolder}
              type={projectDetails.type as ProjectType}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectEditorSection;
