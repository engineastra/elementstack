import Header from 'apps/web-app/src/components/Header';
import HeaderOptions from './HeaderOptions';
import { oxanium } from 'apps/web-app/src/constants/Common';

const Project = () => {
  return (
    <div
      className={`flex flex-col min-h-[100vh] ${oxanium.variable} px-5 py-4`}
    >
      <Header />
      <HeaderOptions />
    </div>
  );
};

export default Project;
