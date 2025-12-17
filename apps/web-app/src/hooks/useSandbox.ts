import { Folder } from '@elementstack/shared-assets/Types';
import { buildProject, renderInIframe } from '@web-app/sandbox';
import { folderToVfs, normalizeVfs } from '@web-app/sandbox/folderToVFS';
import { initEsbuild } from '@web-app/sandbox/initEsbuild';
import { useEffect, useRef } from 'react';

export function useSandbox(
  rootFolder: Folder,
  projectType: 'js' | 'ts' | 'jsx' | 'tsx'
) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    (async () => {
      // 1️⃣ Convert editor state → runtime VFS
      const rawVfs = folderToVfs(rootFolder);
      const vfs = normalizeVfs(rawVfs);

      // Initialize esbuild
      await initEsbuild();

      // 2️⃣ Build JS
      const bundledCode = await buildProject(vfs, projectType);

      // 3️⃣ Render
      renderInIframe(iframeRef.current!, vfs, bundledCode);
    })();
  }, [rootFolder, projectType]);

  return iframeRef;
}
