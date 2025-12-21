import {
  FileData,
  Folder,
  ProjectDetailsSchema,
} from '@elementstack/shared-assets/Types';
import { LOCAL_STORAGE_KEYS } from '@web-app/constants/Common';
import { decodeBase64, encodeBase64 } from './commonUtils';

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
      allProjects = allProjects.filter((proj) => proj.id !== id);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.projects);
      allProjects.forEach((proj) => setProjectsInLocalStorage(proj));
    }
  }
};

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
