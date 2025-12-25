'use client';
import { SandboxPreview } from '@web-app/components/Preview';
import { FullPreviewContext } from '@web-app/contexts/FullPreviewProvider';
import React, { useContext } from 'react';

const FullPagePreview = () => {
  const { fullPreviewData } = useContext(FullPreviewContext);

  if (!fullPreviewData) return <>Loading...</>;
  return (
    <div className='w-[100vw] h-[100vh]'>
      <SandboxPreview
        folder={fullPreviewData.folder}
        type={fullPreviewData.type}
      />
    </div>
  );
};

export default FullPagePreview;
