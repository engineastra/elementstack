'use client';
import { Controller } from 'react-hook-form';
import { CREATE_PROJECT_OPTIONS } from '@elementstack/shared-assets/Constants';
import { oxanium } from '@web-app/constants/Common';
import Image from 'next/image';
import { useCreateProject } from '@web-app/hooks/useCreateProject';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';

const CreateProject = ({
  projects,
  onClose,
}: {
  projects: Array<ProjectDetailsSchema>;
  onClose: () => void;
}) => {
  const {
    control,
    projectType,
    projectName,
    errors,
    handleProjectTypeSelection,
    handleCreateClick,
  } = useCreateProject(onClose, projects);

  return (
    <div
      className={`flex flex-col ${oxanium.variable} w-[90vw] lg:max-w-[550px] gap-3`}
    >
      <header className="flex with-divider justify-between items-center pb-3">
        <p className="oxanium-font text-primary text-[24px]">Create Project</p>
        <button
          disabled={
            !(projectName && !errors.projectName?.message && projectType)
          }
          className="oxanium-font py-2 px-5 text-[14px] theme-grad disabled:bg-none disabled:bg-disabled rounded-full text-black disabled:text-white disabled:cursor-not-allowed font-medium border-none hover:scale-105"
          onClick={handleCreateClick}
        >
          Create
        </button>
      </header>
      <div className="flex flex-col gap-2 mt-1">
        <p className="oxanium-font text-secondaryText text-[16px] font-medium">
          Enter Name
        </p>
        <Controller
          name="projectName"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                type="text"
                className="w-full h-[45px] oxanium-font text-white text-[16px] font-medium outline-none rounded-xl bg-greenishgrey px-3"
              />
              {fieldState.error && (
                <p className="text-error text-[12px] italic font-medium">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="oxanium-font text-secondaryText text-[16px] font-medium">
          Select tech stack for the project
        </p>
        <div className="flex flex-wrap gap-3 cursor-pointer">
          {Object.entries(CREATE_PROJECT_OPTIONS).map(([key, val]) => {
            return (
              <button
                key={key}
                data-type={key}
                className={`flex gap-2 rounded-xl bg-card px-5 py-3 w-fit border border-${
                  projectType === key ? 'primary' : 'transparent'
                } hover:scale-105`}
                onClick={handleProjectTypeSelection}
              >
                <Image src={val.icon} alt={val.title} className="w-6 h-6" />
                <p>{val.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
