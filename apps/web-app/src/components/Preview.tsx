'use client';
import { COMMON_COLORS } from '@elementstack/shared-assets/Constants';
import { Folder, ProjectType } from '@elementstack/shared-assets/Types';
import {
  flattenFiles,
  getEntryPoint,
  updateErrorInIframe,
  updateIframe,
} from '@web-app/sandbox/helper';
// import { handleBuild as runEsBuild } from '@web-app/sandbox/render';
import { useEffect, useRef } from 'react';

export function SandboxPreview({
  folder,
  type,
}: {
  folder: Folder;
  type: ProjectType;
}) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Only create the worker if it doesn't exist
    if (!workerRef.current) {
      const flatFiles = flattenFiles(folder);

      // Find your entry point (e.g., /src/index.jsx or /src/index.js)
      const entryPoint = getEntryPoint(type);
      workerRef.current = new Worker(
        new URL('../sandbox/bundler.worker.ts', import.meta.url),
        { type: 'module' }
      );
      workerRef.current.postMessage({ files: flatFiles, entryPoint });

      workerRef.current.onmessage = (e) => {
        if (e.data.error) {
          updateErrorInIframe(e.data.error, folder.id);
        } else {
          updateIframe(
            e.data.code,
            folder.id,
            flatFiles[
              type === (ProjectType.js || ProjectType.ts)
                ? '/src/index.html'
                : '/public/index.html'
            ]
          );
        }
      };
    }

    return () => {
      // Clean up: Terminate the worker when the component actually unmounts
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [folder]);

  return (
    <div className="h-full w-full">
      <iframe
        id={folder.id}
        sandbox="allow-scripts allow-same-origin allow-modals"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: COMMON_COLORS.card,
        }}
      />
    </div>
  );
}
