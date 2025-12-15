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
          type: 'ts',
          parentFolderId: '00:src',
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
      type: 'html',
      parentFolderId: '0:Demo Project',
    },
    {
      id: '04:styles.css',
      name: 'styles.css',
      type: 'css',
      parentFolderId: '0:Demo Project',
    },
    {
      id: '05:package.json',
      name: 'package.json',
      type: 'json',
      parentFolderId: '0:Demo Project',
    },
  ],
};
