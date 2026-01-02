'use client';
import { ProjectType } from '@elementstack/shared-assets/Types';
import { SandboxPreview } from '@web-app/components/Preview';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import HorizontalResizeDivider from '@web-app/components/HorizontalResizeDivider';
import { getFileById } from '@web-app/utils/projectUtils';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import FileSystem from '@web-app/components/filesystem/FileSystem';
import {
  COMMON_COLORS,
  CREATE_PROJECT_OPTIONS,
} from '@elementstack/shared-assets/Constants';

function ProjectEditorSection({ selectedFileId }: { selectedFileId: string }) {
  const { windowSize } = useContext(SizeProviderContext);
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const [dividerLeft, setDividerLeft] = useState(70);
  const { fsDetails } = projectDetails;
  const { rootFolder } = fsDetails;
  const fileObj = getFileById(selectedFileId, rootFolder);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isTablet = [
    DEVICE_SIZES.xsm,
    DEVICE_SIZES.sm,
    DEVICE_SIZES.md,
  ].includes(windowSize);

  const updateValue = (val: string) => {
    if (fileObj) {
      fileObj.value = val;
      setProjectDetails({
        payload: { fsDetails: { ...fsDetails, rootFolder: { ...rootFolder } } },
      });
    }
  };

  const onResize = (currLeft: number) => {
    if (editorRef.current && previewRef.current) {
      editorRef.current.style.width = `calc(${currLeft + '%'})`;
      previewRef.current.style.width = `calc(${100 - currLeft + '%'})`;
      setDividerLeft(currLeft);
    }
  };

  useEffect(() => {
    if (isTablet) {
      if (editorRef.current) editorRef.current.style.width = '100%';
      if (previewRef.current) previewRef.current.style.width = '100%';
    } else {
      onResize(70);
    }
  }, [isTablet]);

  return (
    <div
      className="flex flex-col-reverse md:flex-row md:h-full w-full min-w-0 min-h-0 md:max-h-[98vh] gap-1 justify-start md:justify-between *:select-none"
      ref={wrapperRef}
    >
      <div
        ref={editorRef}
        className="flex flex-col md:flex-row flex-1 rounded-b-lg h-full min-h-0 gap-2 overflow-hidden"
      >
        <div className="flex flex-0 flex-col h-fit md:h-full w-full md:w-[220px] py-3 px-2 rounded-md bg-pannel gap-2">
          <FileSystem
            initialFsData={fsDetails}
            colorTheme={COMMON_COLORS.project[500]}
            title={CREATE_PROJECT_OPTIONS[projectDetails.meta.type].title}
            icon={CREATE_PROJECT_OPTIONS[projectDetails.meta.type].icon}
            onUpdateFsData={(data) => {
              setProjectDetails({ payload: { fsDetails: data } });
            }}
          />
        </div>
        <div className="project-editor flex-col h-[70vh] md:h-full w-full md:w-[calc(100%-220px)] flex rounded-b-md gap-2">
          <div className="flex h-[30px] py-2 w-full text-[13px] text-project-500 bg-pannel rounded-md rounded-b-none items-center justify-center">
            Code
          </div>
          <div className="h-[calc(100%-30px)] overflow-scroll">
            {fileObj && (
              <CodemirrorEditor
                key={`${fileObj.id} ${windowSize}`}
                value={fileObj.value}
                extention={fileObj.extention}
                lineDecorationsWidth={20}
                fontSize={14}
                setValue={updateValue}
                width="100%"
              />
            )}
          </div>
        </div>
      </div>

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
          <div className="flex h-[30px] py-2 w-full text-[13px] text-project-500 bg-pannel rounded-md rounded-b-none items-center justify-center">
            Preview
          </div>
          <SandboxPreview
            folder={rootFolder}
            type={projectDetails.meta.type as ProjectType}
          />
        </div>
      </>
    </div>
  );
}

export default ProjectEditorSection;
