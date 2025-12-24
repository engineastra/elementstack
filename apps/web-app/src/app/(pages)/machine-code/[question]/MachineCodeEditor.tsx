'use client';
import { useContext } from 'react';
import { getFileById } from '@web-app/utils/projectUtils';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import { MachineQuestionDetailsContext } from '@web-app/contexts/MachineQuestionProvider';

function MachineCodeEditor() {
  const { machineQuestionDetails, setMachineQuestionDetails } = useContext(
    MachineQuestionDetailsContext
  );
  const { rootFolder, selectedFileId } = machineQuestionDetails;
  const fileObj = getFileById(selectedFileId, rootFolder);

  const updateValue = (val: string) => {
    if (fileObj) {
      fileObj.value = val;
      setMachineQuestionDetails({ payload: { rootFolder: { ...rootFolder } } });
    }
  };

  return (
    <div className="project-editor flex flex-col md:flex-row md:h-full w-full min-w-0 min-h-0 gap-1 justify-start md:justify-between *:select-none">
      {fileObj && (
        <CodemirrorEditor
          key={fileObj.id}
          value={fileObj.value}
          extention={fileObj.extention}
          lineDecorationsWidth={20}
          fontSize={14}
          setValue={updateValue}
          width="100%"
        />
      )}
    </div>
  );
}

export default MachineCodeEditor;
