'use client';
import { ProjectType } from '@elementstack/shared-assets/Types';
import Editor from '@web-app/components/Editor';
import { SandboxPreview } from '@web-app/components/Preview';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import closeSVG from '@elementstack/shared-assets/icons/close.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import FilesTab from './FilesTab';
import Image from 'next/image';
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';
import { getFileById } from '@web-app/utils/projectUtils';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

function ProjectEditorSection({ selectedFileId }: { selectedFileId: string }) {
  const { windowSize } = useContext(SizeProviderContext);
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

  const resetResize = () => {
    if (editorRef.current && previewRef.current) {
      editorRef.current.style.width = '100%';
      previewRef.current.style.width = '100%';
    }
  };

  useEffect(() => {
    if (windowSize === DEVICE_SIZES.xsm || windowSize === DEVICE_SIZES.sm)
      resetResize();
  }, [windowSize]);

  return (
    <div
      className="flex flex-col md:flex-row md:h-full w-full min-w-0 gap-1 justify-start md:justify-between *:select-none"
      ref={wrapperRef}
    >
      <div
        ref={editorRef}
        className={`flex flex-col h-[70vh] md:h-full ${
          isPreviewOn ? '' : 'flex-1'
        }`}
      >
        <FilesTab />
        {selectedFileId && fileObj && (
          <div className="flex flex-1 bg-card pl-2 pt-2 rounded-b-md">
            <Editor
              key={`${isPreviewOn} ${fileObj.id} ${windowSize}`}
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
          {!(
            windowSize === DEVICE_SIZES.xsm || windowSize === DEVICE_SIZES.sm
          ) && (
            <HorizontalResizeDivider
              left={dividerLeft}
              min={30}
              max={80}
              onResize={onResize}
              windowRef={wrapperRef as React.RefObject<HTMLDivElement>}
            />
          )}
          <div ref={previewRef} className="flex flex-col h-[70vh] md:h-full">
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
