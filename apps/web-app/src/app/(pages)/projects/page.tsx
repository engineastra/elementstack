import { oxanium } from '@web-app/constants/Common';
import AllProjects from './AllProjects';
import Header from './Header';

const Project = () => {
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${oxanium.variable} px-2 md:px-5 py-4`}
    >
      <Header />
      <AllProjects />
    </div>
  );
};

export default Project;
