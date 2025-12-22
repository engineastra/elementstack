import { Folder } from '@elementstack/shared-assets/Types';

export const DummyRootFolder: Folder = {
  id: '0:Demo Project',
  name: 'Demo Project',
  totalItems: 6,
  isRoot: true,
  parentFolderId: '',
  folders: [
    {
      id: '00:src',
      name: 'src',
      totalItems: 1,
      parentFolderId: '0:Demo Project',
      folders: [],
      files: [
        {
          id: '000:index.tsx',
          name: 'index.tsx',
          extention: 'ts',
          parentFolderId: '00:src',
          value: '',
          language: 'typescript',
        },
      ],
    },
    {
      id: '01:apps',
      name: 'apps',
      parentFolderId: '0:Demo Project',
      totalItems: 0,
      files: [],
      folders: [],
    },
    {
      id: '02:assets',
      name: 'assets',
      parentFolderId: '0:Demo Project',
      totalItems: 0,
      files: [],
      folders: [],
    },
  ],
  files: [
    {
      id: '03:index.htm',
      name: 'index.html',
      extention: 'html',
      parentFolderId: '0:Demo Project',
      value:
        '<!DOCTYPE html>\n<html>\n  <head>\n    <title>JavaScript Sandbox</title>\n    <meta charset="UTF-8" />\n  </head>\n\n  <body>\n    <div id="app"></div>\n\n    \x3Cscript src="./index.mjs" type="module">\x3C/script>\n  </body>\n</html>\n',
      language: 'html',
    },
    {
      id: '04:styles.css',
      name: 'styles.css',
      extention: 'css',
      parentFolderId: '0:Demo Project',
      value:
        '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: sans-serif;\n}\n\n.file {\n  padding: 0px 10px;\n  border-left: 1px solid black;\n}\n\n.folder {\n  width: fit-content;\n  border-left: 1px solid black;\n  padding: 0px 10px;\n  display: flex;\n  flex-direction: column;\n  & > .info {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    p {\n      width: fit-content;\n    }\n    button {\n      height: 30px;\n      padding: 0 5px;\n      cursor: pointer;\n    }\n  }\n  & > .content {\n    margin-top: 10px;\n    padding-left: 20px;\n    & > .name-input {\n      display: flex;\n      gap: 2px;\n    }\n  }\n}\n\n.tick,\n.cross {\n  cursor: pointer;\n}\n',
      language: 'css',
    },
    {
      id: '05:package.json',
      name: 'package.json',
      extention: 'json',
      parentFolderId: '0:Demo Project',
      value:
        '{\n  "name": "javascript",\n  "version": "1.0.0",\n  "description": "The JavaScript template",\n  "scripts": {\n    "start": "parcel ./src/index.html",\n    "build": "parcel build ./src/index.html"\n  },\n  "devDependencies": {\n    "parcel": "^2.0.0",\n    "babel-eslint": "^10.1.0",\n    "eslint": "^7.2.0"\n  },\n  "keywords": ["css", "javascript"]\n}\n',
      language: 'json',
    },
  ],
};
