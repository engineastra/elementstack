import { CREATE_PROJECT_OPTIONS } from '@elementstack/shared-assets/Constants';
import { oxanium } from '../constants/Common';
import Image from 'next/image';

const CreateProject = () => {
  return (
    <div
      className={`flex flex-col ${oxanium.variable} w-[95vw] lg:max-w-[550px] gap-3`}
    >
      <header className="flex with-divider justify-between items-center pb-3">
        <p className="oxanium-font text-primary text-[24px]">Create Project</p>
        <button className="oxanium-font py-2 px-5 text-[14px] theme-grad rounded-full text-black font-medium border-none hover:scale-105">
          Create
        </button>
      </header>
      <div className="flex flex-col gap-2 mt-1">
        <p className="oxanium-font text-secondaryText text-[16px] font-medium">
          Enter Name
        </p>
        <input
          type="text"
          className="w-full h-[45px] oxanium-font text-white text-[16px] font-medium outline-none rounded-xl bg-greenishgrey px-3"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="oxanium-font text-secondaryText text-[16px] font-medium">
          Select tech stack for the project
        </p>
        <div className="flex flex-wrap gap-3 cursor-pointer">
          {Object.values(CREATE_PROJECT_OPTIONS).map((obj) => {
            return (
              <button
                key={obj.id}
                className="flex gap-2 rounded-xl bg-card px-5 py-3 w-fit"
              >
                <Image src={obj.icon} alt={obj.title} className="w-6 h-6" />
                <p>{obj.title}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
