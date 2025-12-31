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

const app = document.getElementById('app');

app.innerHTML = \`
  <main class="app-container">
  <main class="app-container">
    <header class="app-header">
      <h1>
        Welcome to <span>ElementStack</span>
      </h1>
      <p>
        Edit <code>index.js</code> and save to get started.
      </p>
    </header>

    <footer class="app-footer">
      <span>⚡ Vanilla JavaScript</span>
      <span>•</span>
      <span>Minimal. Fast. Zero Build.</span>
    </footer>
  </main>
\`;
`,
  css: `:root {
  --bg: #0b0f1a;
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 255, 255, 0.08);
  --text: #e6e8eb;
  --muted: #9aa4b2;
  --accent: #7c7cff;
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: radial-gradient(
      circle at top,
      rgba(124, 124, 255, 0.15),
      transparent 40%
    ),
    var(--bg);
  color: var(--text);
}

#app {
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
}

.app-container {
  width: 100%;
  max-width: 720px;
  padding: 40px 32px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  text-align: center;
}

.app-header h1 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  margin-bottom: 8px;
}

.app-header h1 span {
  background: linear-gradient(90deg, #7c7cff, #4fd1c5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-header p {
  color: var(--muted);
  margin: 0;
}

.app-header code {
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
}

.app-actions {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.app-actions a {
  padding: 10px 18px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.app-actions .primary {
  background: var(--accent);
  color: #0b0f1a;
  border-color: transparent;
}

.app-actions .primary:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.app-actions .secondary {
  color: var(--text);
  background: transparent;
}

.app-actions .secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

.app-footer {
  margin-top: 40px;
  display: flex;
  gap: 8px;
  justify-content: center;
  color: var(--muted);
  font-size: 0.9rem;
  flex-wrap: wrap;
}
`,
  ts: `import "./styles.css";

document.getElementById("app").innerHTML = \`
<h1>Hello JavaScript!</h1>
\`;`,
  jsx: `import "./styles.css";

export default function App() {
  return (
    <div className="app-root">
      <main className="app-container">
        <header className="app-header">
          <h1>
            Welcome to <span>ElementStack</span>
          </h1>
          <p>
            Edit <code>App.[jsx/tsx]</code> and save to get started.
          </p>
        </header>

        <footer className="app-footer">
          <span>⚡ Powered by React</span>
          <span>•</span>
          <span>Minimal. Fast. Extensible.</span>
        </footer>
      </main>
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
  jsxCSS: `:root {
  --bg: #0b0f1a;
  --panel: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 255, 255, 0.08);
  --text: #e6e8eb;
  --muted: #9aa4b2;
  --accent: #7c7cff;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: radial-gradient(
      circle at top,
      rgba(124, 124, 255, 0.15),
      transparent 40%
    ),
    var(--bg);
  color: var(--text);
}

.app-root {
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
}

.app-container {
  width: 100%;
  max-width: 720px;
  padding: 40px 32px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(12px);
  text-align: center;
}

.app-header h1 {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  margin-bottom: 8px;
}

.app-header h1 span {
  background: linear-gradient(90deg, #7c7cff, #4fd1c5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.app-header p {
  color: var(--muted);
  margin: 0;
}

.app-header code {
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
}

.app-actions {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.app-actions a {
  padding: 10px 18px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.app-actions .primary {
  background: var(--accent);
  color: #0b0f1a;
  border-color: transparent;
}

.app-actions .primary:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.app-actions .secondary {
  color: var(--text);
  background: transparent;
}

.app-actions .secondary:hover {
  background: rgba(255, 255, 255, 0.06);
}

.app-footer {
  margin-top: 40px;
  display: flex;
  gap: 8px;
  justify-content: center;
  color: var(--muted);
  font-size: 0.9rem;
  flex-wrap: wrap;
}
`,
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
            parentFolderId: '01:src',
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
            parentFolderId: '01:src',
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
            parentFolderId: '01:public',
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
            parentFolderId: '01:public',
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
      file.canBeRemoved = false;
    });
    newFolder.folders.forEach((fld) => {
      fld.parentFolderId = newFolder.id;
      fld.canBeRemoved = false;
    });
    return newFolder;
  }
  return null;
};
