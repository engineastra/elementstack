import {
  FileData,
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import { LOCAL_STORAGE_KEYS } from '@web-app/constants/Common';

export const defaultStateReducer = <T, U>(state: T, action: { payload: U }) => {
  const { payload } = action;
  const newState = { ...state, ...payload };
  return { ...newState };
};

const encodeBase64 = (value: string) =>
  btoa(
    new TextEncoder()
      .encode(value)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

const decodeBase64 = (value: string) =>
  new TextDecoder().decode(
    Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
  );

export const setProjectsInLocalStorage = (
  projectDetails: ProjectDetailsSchema
) => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeBase64(allProjectsB64);
      allProjects = JSON.parse(allProjectsJSON);
      allProjects = allProjects.filter(
        (proj) => proj.id && proj.id != projectDetails.id
      );
    }
    allProjects.push(projectDetails);
    const jsonString = JSON.stringify(allProjects);
    const base64 = encodeBase64(jsonString);
    localStorage.setItem(LOCAL_STORAGE_KEYS.projects, base64);
  }
};

export const getAllProjectsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeBase64(allProjectsB64);
      allProjects = JSON.parse(allProjectsJSON);
      allProjects = allProjects.filter((proj) => proj.id);
    }
    return allProjects.reverse();
  }
  return [];
};

export const getProjectFromLocalStorageById = (id: string) => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeBase64(allProjectsB64);
      allProjects = JSON.parse(allProjectsJSON);
      const projectDetails = allProjects.filter((proj) => proj.id === id)[0];
      return projectDetails || [];
    }
    return allProjects;
  }
  return {};
};

export const deleteProjectFromLocalStorageById = (id: string) => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeBase64(allProjectsB64);
      allProjects = JSON.parse(allProjectsJSON);
      const projectDetails = allProjects.filter((proj) => proj.id === id)[0];
      return projectDetails || [];
    }
    return allProjects;
  }
  return {};
};

export function findEntryFile(folder: Folder, basePath = ''): string | null {
  const currentPath = basePath ? `${basePath}/${folder.name}` : folder.name;

  // 1️⃣ Check files directly inside this folder
  const directEntries = ['index.tsx', 'index.ts'];
  for (const file of folder.files) {
    if (directEntries.includes(file.name)) {
      return `${currentPath}/${file.name}`;
    }
  }

  // 2️⃣ Check src/ folder explicitly
  const srcFolder = folder.folders.find((f) => f.name === 'src');
  if (srcFolder) {
    for (const file of srcFolder.files) {
      if (directEntries.includes(file.name)) {
        return `${currentPath}/src/${file.name}`;
      }
    }
  }

  // 3️⃣ Recurse
  for (const sub of folder.folders) {
    const found = findEntryFile(sub, currentPath);
    if (found) return found;
  }

  return null;
}

export const getFolderById = (fldId: string, root: Folder): Folder | null => {
  // base condition
  if (root.id === fldId) {
    return root;
  }
  let output: Folder | null = null;
  root.folders.forEach((nextFld) => {
    if (output === null) {
      output = getFolderById(fldId, nextFld);
    }
  });
  return output;
};

export const getFileById = (fileId: string, root: Folder): FileData | null => {
  // base condition
  for (const val of root.files) {
    if (val.id === fileId) return val;
  }
  let output: FileData | null = null;
  root.folders.forEach((nextFld) => {
    if (output === null) {
      output = getFileById(fileId, nextFld);
    }
  });
  return output;
};
