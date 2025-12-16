import Header from '@web-app/components/Header';
import HeaderOptions from './HeaderOptions';
import { oxanium } from '@web-app/constants/Common';
import AllProjects from './AllProjects';

const Project = () => {
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${oxanium.variable} px-5 py-4`}
    >
      <Header />
      <HeaderOptions />
      <AllProjects />
    </div>
  );
};

export default Project;
