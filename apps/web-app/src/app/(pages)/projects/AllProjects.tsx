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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

const AllProjects = ({
  projects,
  selectedProjects,
  setProjects,
  setSelectedProjects,
}: {
  projects: Array<ProjectDetailsSchema>;
  selectedProjects: Array<string>;
  setProjects: Dispatch<Array<ProjectDetailsSchema>>;
  setSelectedProjects: Dispatch<Array<string> | SetStateAction<Array<string>>>;
}) => {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { setProjectDetails } = useContext(ProjectDetailsContext);

  useEffect(() => {
    setIsClient(true);
    setProjects(getAllProjectsFromLocalStorage());
  }, [selectedProjects]);

  const onClickProject = (
    e: React.MouseEvent<HTMLDivElement>,
    projPayload: ProjectDetailsSchema
  ) => {
    if (e.ctrlKey || e.metaKey) {
      if (selectedProjects.includes(projPayload.id)) {
        setSelectedProjects(
          selectedProjects.filter((id) => id != projPayload.id)
        );
      } else {
        setSelectedProjects((prev) => [...prev, projPayload.id]);
      }
    } else {
      setProjectDetails({ payload: projPayload });
      router.push(`${Routes.PROJECT}/${projPayload.id}`);
    }
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
            className={`relative flex w-full sm:w-[200px] h-[100px] px-3 py-2 rounded-md gap-2 cursor-pointer overflow-hidden ${
              selectedProjects.includes(project.id) ? 'opacity-40' : ''
            }`}
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
            onClick={(e) => onClickProject(e, project)}
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
