'use client';
import Editor from '@web-app/components/Editor';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { useContext } from 'react';

const ProjectEditorSection = () => {
  const { projectDetails, setProjectDetails } = useContext(
    ProjectDetailsContext
  );
  const { tabs, selectedFile } = projectDetails;
  const updateValue = (val: string) => {
    selectedFile.value = val;
    setProjectDetails({ payload: { tabs: [...tabs] } });
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
