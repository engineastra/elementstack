import { BOILER_PLATES } from '@elementstack/shared-assets/Template';
import { Folder, ProjectType } from '@elementstack/shared-assets/Types';

// Helper to turn your nested structure into: { "/src/index.js": "content..." }
export const flattenFiles = (
  folder: Folder,
  path = ''
): Record<string, string> => {
  const files: Record<string, string> = {};

  folder.files.forEach((file) => {
    // Ensure this starts with /
    const filePath = `${path}/${file.name}`.replace(/\/+/g, '/');
    files[filePath] = file.value;
  });

  folder.folders.forEach((subFolder) => {
    Object.assign(files, flattenFiles(subFolder, `${path}/${subFolder.name}`));
  });

  return files;
};

export const updateIframe = (bundledCode: string, indexHtml?: string) => {
  const iframe = document.getElementById('sandbox-iframe') as HTMLIFrameElement;

  // Base64-encode the JS so it is safe inside a data URL
  const base64Js = btoa(unescape(encodeURIComponent(bundledCode)));
  const scriptUrl = `data:text/javascript;base64,${base64Js}`;
  if (!indexHtml) indexHtml = BOILER_PLATES.html;
  const htmlWithScript = indexHtml.replace(
    '<script type="module"></script>',
    `<script type="module" src="${scriptUrl}"></script>`
  );

  iframe.srcdoc = htmlWithScript;
};

export const updateErrorInIframe = (
  err: string,
  indexHtml = BOILER_PLATES['html']
) => {
  const iframe = document.getElementById('sandbox-iframe') as HTMLIFrameElement;

  const htmlWithScript = indexHtml.replace(
    `<div id="root"></div>`,
    `<div id="root" style="color: red;">${err}</div>`
  );

  iframe.srcdoc = htmlWithScript;
};

export const getEntryPoint = (type: ProjectType): string => {
  const map: Record<ProjectType, string> = {
    js: '/src/index.js',
    ts: '/src/index.ts',
    jsx: '/src/index.jsx',
    tsx: '/src/index.tsx',
  };
  return map[type];
};
