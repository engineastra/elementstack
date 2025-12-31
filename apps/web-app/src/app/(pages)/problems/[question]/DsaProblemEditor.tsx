'use client';
import { useContext } from 'react';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import { DsaProblemsDetailsContext } from '@web-app/contexts/DsaProblemsProvider';

function DsaProblemEditor() {
  const { dsaProblemDetails } = useContext(
    DsaProblemsDetailsContext
  );

  return (
    <div className="project-editor flex flex-col md:flex-row md:h-full w-full min-w-0 min-h-0 gap-1 justify-start md:justify-between *:select-none">
      <CodemirrorEditor
        value={dsaProblemDetails.values?.js}
        extention="js"
        lineDecorationsWidth={20}
        fontSize={14}
        setValue={() => {
          return;
        }}
        width="100%"
      />
    </div>
  );
}

export default DsaProblemEditor;
