'use client';

import { Folder, ProjectType } from '@elementstack/shared-assets/Types';
import { useSandbox } from '@web-app/hooks/useSandbox';

export function SandboxPreview({
  folder,
  type,
}: {
  folder: Folder;
  type: ProjectType;
}) {
  const iframeRef = useSandbox(folder, type);

  return (
    <div className="h-full w-full">
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{
          width: '100%',
          height: '100%',
          border: '1px solid #ddd',
        }}
      />
    </div>
  );
}
