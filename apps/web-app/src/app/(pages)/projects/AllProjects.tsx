'use client';
import { CREATE_PROJECT_OPTIONS } from '@elementstack/shared-assets/Constants';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
import Routes from '@web-app/constants/Routes';
import { ProjectDetailsContext } from '@web-app/contexts/ProjectDetailsProvider';
import { getAllProjectsFromLocalStorage } from '@web-app/utils/commonUtils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const AllProjects = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Array<ProjectDetailsSchema>>([]);
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
    <div className="flex w-full max-w-[100vw] flex-wrap pt-6 gap-2">
      {projects.map((project) => {
        return (
          <div
            key={project.id || project.name}
            className="flex px-3 py-2 rounded-md border border-primary gap-2 cursor-pointer"
            onClick={() => onClickProject(project)}
          >
            <Image
              className="w-4"
              src={CREATE_PROJECT_OPTIONS[project.type].icon}
              alt="type-logo"
            />
            <div>{project.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProjects;
