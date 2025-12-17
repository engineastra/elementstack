import type { Folder } from '@elementstack/shared-assets/Types';

export function folderToVfs(
  folder: Folder,
  basePath: string | null = null
): Record<string, string> {
  const vfs: Record<string, string> = {};

  const currentPath =
    basePath === null ? folder.name : `${basePath}/${folder.name}`;

  // Add files at this level
  for (const file of folder.files) {
    vfs[`${currentPath}/${file.name}`] = file.value;
  }

  // Recurse into subfolders
  for (const sub of folder.folders) {
    Object.assign(vfs, folderToVfs(sub, currentPath));
  }

  return vfs;
}

export function normalizeVfs(
  vfs: Record<string, string>
): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [path, content] of Object.entries(vfs)) {
    const cleanPath = path.replace(/^\/+/, '').replace(/\\/g, '/');

    normalized[cleanPath] = content;
  }

  return normalized;
}
