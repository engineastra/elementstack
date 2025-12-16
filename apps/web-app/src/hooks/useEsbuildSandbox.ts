/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import type { Folder } from '@elementstack/shared-assets/Types';

let esbuildInitialized = false;

/* ------------------ Virtual FS Builder ------------------ */

function buildVirtualFS(folder: Folder, basePath = ''): Record<string, string> {
  const files: Record<string, string> = {};
  const currentPath = basePath ? `${basePath}/${folder.name}` : folder.name;

  folder.files.forEach((file) => {
    files[`${currentPath}/${file.name}`] = file.value;
  });

  folder.folders.forEach((sub) => {
    Object.assign(files, buildVirtualFS(sub, currentPath));
  });

  return files;
}

/* ------------------ esbuild Plugin ------------------ */

function virtualFsPlugin(files: Record<string, string>): esbuild.Plugin {
  return {
    name: 'virtual-fs',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const resolvedPath = args.path.startsWith('.')
          ? new URL(args.path, `file://${args.resolveDir}/`).pathname.slice(1)
          : args.path;

        if (files[resolvedPath]) {
          return { path: resolvedPath, namespace: 'virtual' };
        }
      });

      build.onLoad({ filter: /.*/, namespace: 'virtual' }, (args) => {
        const ext = args.path.split('.').pop() as esbuild.Loader;
        return {
          contents: files[args.path],
          loader: ext,
        };
      });
    },
  };
}

/* ------------------ Hook ------------------ */

export function useEsbuildSandbox(rootFolder: Folder) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        if (!esbuildInitialized) {
          await esbuild.initialize({
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.19.11/esbuild.wasm',
          });
          esbuildInitialized = true;
        }

        const virtualFS = buildVirtualFS(rootFolder);

        const result = await esbuild.build({
          entryPoints: ['Demo Project/src/index.tsx'],
          bundle: true,
          write: false,
          plugins: [virtualFsPlugin(virtualFS)],
          define: {
            'process.env.NODE_ENV': '"production"',
          },
        });

        const code = result.outputFiles[0].text;

        const iframe = iframeRef.current!;
        iframe.srcdoc = `
          <html>
            <body>
              <div id="root"></div>
              <script>
                try {
                  ${code}
                } catch (e) {
                  document.body.innerHTML = '<pre style="color:red">' + e + '</pre>';
                }
              </script>
            </body>
          </html>
        `;
      } catch (err: any) {
        setError(err.message);
      }
    };

    run();
  }, [rootFolder]);

  return { iframeRef, error };
}
