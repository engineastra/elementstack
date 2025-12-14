import { Folder } from '@elementstack/shared-assets/Types';

export const DummyRootFolder: Folder = {
  id: '0',
  name: 'Demo Project',
  totalItems: 6,
  folders: [
    {
      id: '00-src',
      name: 'src',
      totalItems: 1,
      folders: [],
      files: [{ id: '000-index.tsx', name: 'index.tsx', type: 'ts' }],
    },
    { id: '01-apps', name: 'apps', totalItems: 0, files: [], folders: [] },
    { id: '02-assets', name: 'assets', totalItems: 0, files: [], folders: [] },
  ],
  files: [
    { id: '03-index.htm', name: 'index.html', type: 'html' },
    { id: '04-styles.css', name: 'styles.css', type: 'css' },
    { id: '05-package.json', name: 'package.json', type: 'json' },
  ],
};
