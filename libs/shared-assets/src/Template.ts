import { Folder } from './Types';

export const BOILER_PLATES = {
  html: `<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="app"></div>

    <script src="./index.mjs" type="module"></script>
  </body>
</html>`,
  json: `{
  "name": "javascript",
  "version": "1.0.0",
  "description": "The JavaScript template",
  "scripts": {
    "start": "parcel ./src/index.html",
    "build": "parcel build ./src/index.html"
  },
  "devDependencies": {
    "parcel": "^2.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^7.2.0"
  },
  "keywords": ["css", "javascript"]
}
`,
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
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
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
	<!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
	<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
	<!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the \`public\` folder during the build.
      Only files inside the \`public\` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running \`npm run build\`.
    -->
	<title>React App</title>
</head>

<body>
	<noscript>
		You need to enable JavaScript to run this app.
	</noscript>
	<div id="root"></div>
	<!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run \`npm start\` or \`yarn start\`.
      To create a production bundle, use \`npm run build \` or \`yarn build\`.
    -->
</body>

</html>`,
  jsxIndex: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
  jsxCSS: `.App {
  font-family: sans-serif;
  text-align: center;
}`,
  reactPackageJSON: `{
  "name": "react",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "main": "src/index.tsx",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-scripts": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "loader-utils": "3.2.1",
    "typescript": "5.7.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [">0.2%", "not dead", "not ie <= 11", "not op_mini all"]
}
`,
  tsconfig: `{
    "include": [
        "./src/**/*"
    ],
    "compilerOptions": {
        "strict": true,
        "esModuleInterop": true,
        "lib": [
            "dom",
            "es2015"
        ],
        "jsx": "react-jsx"
    }
}`,
};

export const LANGUAGE_TEMPLATES: Record<string, Folder> = {
  js: {
    id: '0:', // Update on initialization
    name: '',
    files: [
      {
        id: '00:package.json',
        name: 'package.json',
        type: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.json,
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
            type: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.html,
          },
          {
            id: '011:styles.css',
            name: 'styles.css',
            type: 'css',
            language: 'css',
            parentFolderId: '01:src',
            value: BOILER_PLATES.css,
          },
          {
            id: '012:index.js',
            name: 'index.js',
            type: 'js',
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
        type: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.json,
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
            type: 'html',
            language: 'html',
            parentFolderId: '01:src',
            value: BOILER_PLATES.html,
          },
          {
            id: '011:styles.css',
            name: 'styles.css',
            type: 'css',
            language: 'css',
            parentFolderId: '01:src',
            value: BOILER_PLATES.css,
          },
          {
            id: '012:index.ts',
            name: 'index.ts',
            type: 'ts',
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
        type: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.reactPackageJSON,
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
            type: 'html',
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
            type: 'jsx',
            language: 'javascript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsx,
          },
          {
            id: '021:styles.css',
            name: 'styles.css',
            type: 'css',
            language: 'css',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxCSS,
          },
          {
            id: '022:index.jsx',
            name: 'index.jsx',
            type: 'jsx',
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
        type: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.reactPackageJSON,
      },
      {
        id: '02:tsconfig.json',
        name: 'tsconfig.json',
        type: 'json',
        language: 'json',
        parentFolderId: '0:', // Update on initialization w.r.t parent's id
        value: BOILER_PLATES.tsconfig,
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
            type: 'html',
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
            type: 'tsx',
            language: 'typescript',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsx,
          },
          {
            id: '021:styles.css',
            name: 'styles.css',
            type: 'css',
            language: 'css',
            parentFolderId: '02:src',
            value: BOILER_PLATES.jsxCSS,
          },
          {
            id: '022:index.tsx',
            name: 'index.tsx',
            type: 'tsx',
            language: 'javascript',
            parentFolderId: '01:tsx',
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
  type: string,
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
