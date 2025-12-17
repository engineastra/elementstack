'use client';
import { FileData } from '@elementstack/shared-assets/Types';
import Editor from '@web-app/components/Editor';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { useContext } from 'react';

const ProjectEditorSection = ({ selectedFile }: { selectedFile: FileData }) => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { rootFolder } = projectDetails;
  const updateValue = (val: string) => {
    selectedFile.value = val;
    setProjectDetails({ payload: { rootFolder: { ...rootFolder } } });
  };
  return (
    <div className="flex flex-col h-full w-full pt-3 pl-3 min-w-0">
      {selectedFile.id && (
        <Editor
          value={selectedFile.value}
          selectedLanguageuage={selectedFile.language}
          lineDecorationsWidth={20}
          fontSize={14}
          setValue={updateValue}
        />
      )}
    </div>
  );
};

export default ProjectEditorSection;
