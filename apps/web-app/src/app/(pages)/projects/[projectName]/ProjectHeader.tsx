import Image from 'next/image';
import logo from '@elementstack/shared-assets/icons/Logo.svg';
import { CREATE_PROJECT_OPTIONS } from '@elementstack/shared-assets/Constants';

const ProjectHeader = ({ type, name }: { type: string; name: string }) => {
  console.log(type);
  return (
    <div className="flex w-full justify-between">
      <Image className="inline w-5 h-5" src={logo} alt="app-logo" />
      <div className="flex w-full justify-center items-center gap-1">
        <Image
          className="inline w-5 h-5"
          src={CREATE_PROJECT_OPTIONS[type].icon}
          alt="app-logo"
        />
        <p>{name}</p>
      </div>
      <div></div>
    </div>
  );
};

export default ProjectHeader;
