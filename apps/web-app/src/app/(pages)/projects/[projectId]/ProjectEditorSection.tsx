'use client';
import { ProjectType } from '@elementstack/shared-assets/Types';
import { SandboxPreview } from '@web-app/components/Preview';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { Close } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import FilesTab from './FilesTab';
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';
import { getFileById } from '@web-app/utils/projectUtils';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';

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
      className="flex flex-col md:flex-row md:h-full w-full min-w-0 min-h-0 gap-1 justify-start md:justify-between *:select-none"
      ref={wrapperRef}
    >
      <div
        ref={editorRef}
        className={`flex flex-col ${
          isPreviewOn ? 'min-h-[70vh]' : 'min-h-full'
        } md:h-full flex-1 min-h-0`}
      >
        <FilesTab />
        {selectedFileId && fileObj && (
          <div className="project-editor flex flex-1 pl-2 pt-2 rounded-b-md h-full min-h-0">
            {/* <Editor
              key={`${isPreviewOn} ${fileObj.id} ${windowSize}`}
              value={fileObj.value}
              selectedLanguageuage={fileObj.language}
              lineDecorationsWidth={20}
              fontSize={14}
              setValue={updateValue}
            /> */}
            <CodemirrorEditor
              key={`${isPreviewOn} ${fileObj.id} ${windowSize}`}
              value={fileObj.value}
              extention={fileObj.extention}
              lineDecorationsWidth={20}
              fontSize={14}
              setValue={updateValue}
              width="100%"
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
          <div
            ref={previewRef}
            className="flex flex-col min-h-[70vh] h-[70vh] md:h-full"
          >
            <div className="relative flex h-[40px] min-h-[40px] w-full bg-pannel rounded-md rounded-b-none items-center justify-center">
              <p>Preview</p>
              <Close
                sx={{ fontSize: 15 }}
                onClick={() =>
                  setProjectDetails({ payload: { isPreviewOn: false } })
                }
                className="absolute right-4 cursor-pointer"
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
