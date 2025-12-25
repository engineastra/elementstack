'use client';
import { Folder, ProjectType } from '@elementstack/shared-assets/Types';
import { createContext, useState } from 'react';

type PreviewData = {
  folder: Folder;
  type: ProjectType;
};

export const FullPreviewContext = createContext<{
  fullPreviewData: PreviewData | undefined;
  setFullPreviewData: (folder: PreviewData) => void;
}>({
  fullPreviewData: undefined,
  setFullPreviewData: (_) => {
    return;
  },
});

const FullPreviewProvider = ({ children }: { children: React.ReactNode }) => {
  const [folderData, setFolderData] = useState<PreviewData | undefined>();

  return (
    <FullPreviewContext.Provider
      value={{
        fullPreviewData: folderData,
        setFullPreviewData: (fld) => setFolderData(fld),
      }}
    >
      {children}
    </FullPreviewContext.Provider>
  );
};

export default FullPreviewProvider;
