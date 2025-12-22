import { Folder } from './Types';

export const BOILER_PLATES = {
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="app"></div>
    <script type="module"></script>
  </body>
</html>`,
  js: `import "./styles.css";

document.getElementById("app").innerHTML = \`
<h1>Hello JavaScript!</h1>
\`;`,
  css: `body {
  font-family: sans-serif;
}
`,
  ts: `import "./styles.css";

document.getElementById("app").innerHTML = \`
<h1>Hello JavaScript!</h1>
\`;`,
  jsx: `import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hi There!</h1>
      <h2>Start building something great</h2>
    </div>
  );
}
`,
  jsxHtml: `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="theme-color" content="#000000">
</head>

<body>
	<div id="root"></div>
  <script type="module"></script>
</body>

</html>`,
  jsxIndex: `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element not found');
}

const root = createRoot(rootEl);
root.render(<App />);
`,
  jsxCSS: `.App {
  font-family: sans-serif;
  text-align: center;
}`,
  jsPackageJSON: `{
  "name": "Javascript",
  "version": "ES2022",
  "description": "The Javascript Template",
  "main": "src/index.js"
}
`,
  tsPackageJSON: `{
  "name": "Typescript",
  "version": "ES2022",
  "description": "The Typescript Template",
  "main": "src/index.ts"
}
`,
  jsxPackageJSON: `{
  "name": "React-Javascript",
  "version": "^19",
  "description": "The React Template",
  "main": "src/index.jsx"
}
`,
  tsxPackageJSON: `{
  "name": "React-Typescript",
  "version": "^19",
  "description": "The React Template",
  "main": "src/index.tsx"
}
`,
};

export const LANGUAGE_TEMPLATES: Record<string, Folder> = {
  js: {
    id: '0:', // Update on initialization
    name: '',
    files: [
      {
        id: '00:package.json',
        name: 'package.json',
        extention: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.jsPackageJSON,
      },
    ],
    folders: [
      {
        id: '01:src',
        name: 'src',
        files: [
          {
            id: '010:index.html',
            name: 'index.html',
            extention: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.html,
          },
          {
            id: '011:styles.css',
            name: 'styles.css',
            extention: 'css',
            language: 'css',
            parentFolderId: '01:src',
            value: BOILER_PLATES.css,
          },
          {
            id: '012:index.js',
            name: 'index.js',
            extention: 'js',
            language: 'javascript',
            parentFolderId: '01:js',
            value: BOILER_PLATES.js,
          },
        ],
        folders: [],
        totalItems: 3,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
    ],
    totalItems: 2,
    isRoot: false,
    isExpanded: true,
    parentFolderId: '',
  },
  ts: {
    id: '0:', // Update on initialization
    name: '',
    files: [
      {
        id: '00:package.json',
        name: 'package.json',
        extention: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.tsPackageJSON,
      },
    ],
    folders: [
      {
        id: '01:src',
        name: 'src',
        files: [
          {
            id: '010:index.html',
            name: 'index.html',
            extention: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.html,
          },
          {
            id: '011:styles.css',
            name: 'styles.css',
            extention: 'css',
            language: 'css',
            parentFolderId: '01:src',
            value: BOILER_PLATES.css,
          },
          {
            id: '012:index.ts',
            name: 'index.ts',
            extention: 'ts',
            language: 'typescript',
            parentFolderId: '01:ts',
            value: BOILER_PLATES.ts,
          },
        ],
        folders: [],
        totalItems: 3,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
    ],
    totalItems: 2,
    isRoot: false,
    isExpanded: true,
    parentFolderId: '',
  },
  jsx: {
    id: '0:', // Update on initialization
    name: '',
    files: [
      {
        id: '00:package.json',
        name: 'package.json',
        extention: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.jsx,
      },
    ],
    folders: [
      {
        id: '01:public',
        name: 'public',
        files: [
          {
            id: '010:index.html',
            name: 'index.html',
            extention: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.jsxHtml,
          },
        ],
        folders: [],
        totalItems: 1,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
      {
        id: '02:src',
        name: 'src',
        files: [
          {
            id: '020:App.jsx',
            name: 'App.jsx',
            extention: 'jsx',
            language: 'javascript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsx,
          },
          {
            id: '021:styles.css',
            name: 'styles.css',
            extention: 'css',
            language: 'css',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxCSS,
          },
          {
            id: '022:index.jsx',
            name: 'index.jsx',
            extention: 'jsx',
            language: 'javascript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxIndex,
          },
        ],
        folders: [],
        totalItems: 3,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
    ],
    totalItems: 2,
    isRoot: false,
    isExpanded: true,
    parentFolderId: '',
  },
  tsx: {
    id: '0:', // Update on initialization
    name: '',
    files: [
      {
        id: '00:package.json',
        name: 'package.json',
        extention: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.tsxPackageJSON,
      },
    ],
    folders: [
      {
        id: '01:public',
        name: 'public',
        files: [
          {
            id: '010:index.html',
            name: 'index.html',
            extention: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.jsxHtml,
          },
        ],
        folders: [],
        totalItems: 1,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
      {
        id: '02:src',
        name: 'src',
        files: [
          {
            id: '020:App.tsx',
            name: 'App.tsx',
            extention: 'tsx',
            language: 'typescript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsx,
          },
          {
            id: '021:styles.css',
            name: 'styles.css',
            extention: 'css',
            language: 'css',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxCSS,
          },
          {
            id: '022:index.tsx',
            name: 'index.tsx',
            extention: 'tsx',
            language: 'javascript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxIndex,
          },
        ],
        folders: [],
        totalItems: 3,
        isRoot: false,
        isExpanded: true,
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
      },
    ],
    totalItems: 2,
    isRoot: false,
    isExpanded: true,
    parentFolderId: '',
  },
};

export const getFolderTemplate: (
  extention: string,
  folderName: string
) => Folder | null = (type, folderName) => {
  const newFolder = structuredClone(LANGUAGE_TEMPLATES[type]);
  if (newFolder) {
    newFolder.name = folderName;
    newFolder.id += folderName;
    newFolder.files.forEach((file) => {
      file.parentFolderId = newFolder.id;
    });
    newFolder.folders.forEach((fld) => {
      fld.parentFolderId = newFolder.id;
    });
    return newFolder;
  }
  return null;
};
