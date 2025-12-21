'use client';
import {
  CREATE_PROJECT_OPTIONS,
  PROJECT_THEME_BY_TYPE,
} from '@elementstack/shared-assets/Constants';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
import Routes from '@web-app/constants/Routes';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { getAllProjectsFromLocalStorage } from '@web-app/utils/projectUtils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, useContext, useEffect, useState } from 'react';

const AllProjects = ({
  projects,
  setProjects,
}: {
  projects: Array<ProjectDetailsSchema>;
  setProjects: Dispatch<Array<ProjectDetailsSchema>>;
}) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { setProjectDetails } = useContext(ProjectDetailsContext);

  useEffect(() => {
    setIsClient(true);
    setProjects(getAllProjectsFromLocalStorage());
  }, []);

  const onClickProject = (projPayload: ProjectDetailsSchema) => {
    setProjectDetails({ payload: projPayload });
    router.push(`${Routes.PROJECT}/${projPayload.id}`);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex w-full max-w-[100vw] flex-wrap gap-2 pt-[40px]">
      {projects.map((project) => {
        return (
          <div
            key={project.id || project.name}
            className={`relative flex w-full md:w-[200px] h-[100px] px-3 py-2 rounded-md gap-2 cursor-pointer overflow-hidden`}
            style={{
              border: `1px solid ${
                PROJECT_THEME_BY_TYPE[project.type].text ||
                PROJECT_THEME_BY_TYPE.other.text
              }`,
              backgroundColor: `${
                PROJECT_THEME_BY_TYPE[project.type].text ||
                PROJECT_THEME_BY_TYPE.other.text
              }19`,
            }}
            onClick={() => onClickProject(project)}
          >
            <Image
              className="absolute bottom-3 right-3 w-[40px]"
              src={CREATE_PROJECT_OPTIONS[project.type].icon}
              alt="type-logo"
            />
            <p
              className="p-1 text-[14px] font-bold"
              style={{
                color:
                  PROJECT_THEME_BY_TYPE[project.type].text ||
                  PROJECT_THEME_BY_TYPE.other.text,
              }}
            >
              {project.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default AllProjects;
