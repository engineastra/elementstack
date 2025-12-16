import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
import { LOCAL_STORAGE_KEYS } from '@web-app/constants/Common';

export const defaultStateReducer = <T, U>(state: T, action: { payload: U }) => {
  const { payload } = action;
  const newState = { ...state, ...payload };
  return { ...newState };
};

export const setProjectsInLocalStorage = (
  projectDetails: ProjectDetailsSchema
) => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeURIComponent(escape(atob(allProjectsB64)));
      allProjects = JSON.parse(allProjectsJSON);
      allProjects = allProjects.filter(
        (proj) => proj.id && proj.id != projectDetails.id
      );
    }
    allProjects.push(projectDetails);
    const jsonString = JSON.stringify(allProjects);
    const base64 = btoa(unescape(encodeURIComponent(jsonString)));
    localStorage.setItem(LOCAL_STORAGE_KEYS.projects, base64);
  }
};

export const getAllProjectsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeURIComponent(escape(atob(allProjectsB64)));
      allProjects = JSON.parse(allProjectsJSON);
      allProjects = allProjects.filter((proj) => proj.id);
    }
    return allProjects;
  }
  return [];
};

export const getProjectFromLocalStorageById = (id: string) => {
  if (typeof window !== 'undefined') {
    const allProjectsB64 = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
    let allProjects: Array<ProjectDetailsSchema> = [];
    if (allProjectsB64) {
      const allProjectsJSON = decodeURIComponent(escape(atob(allProjectsB64)));
      allProjects = JSON.parse(allProjectsJSON);
      const projectDetails = allProjects.filter((proj) => proj.id === id)[0];
      return projectDetails || [];
    }
    return allProjects;
  }
  return {};
};
