'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import Image from 'next/image';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import { Branding } from '@web-app/app/Header';
import SearchBar from '@web-app/components/SearchBar';
import { useProject } from '@web-app/hooks/useProject';
import Modal from '@web-app/components/Modal';
import CreateProject from './CreateProject';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
import { Dispatch, SetStateAction, useContext } from 'react';
import DeletePopUp from './DeletePopUp';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

const TitleTag = ({ name }: { name: string }) => {
  return (
    <div
      className={`flex flex-shrink-0 w-fit gap-1 items-center h-fit px-8 py-2 rounded-lg`}
      style={{
        border: `1px solid #e02f2f`,
        backgroundColor: `#a90c0c`,
      }}
    >
      <Image
        className="inline w-4 h-4"
        src={OPTION_CARDS[name].icon}
        alt={OPTION_CARDS[name].title}
      />
      <p
        className={`text-center text-[12px] md:text-[14px] font-semibold text-${OPTION_CARDS[name].textColor}`}
      >
        {OPTION_CARDS[name].title}
      </p>
    </div>
  );
};

const Header = ({
  projects,
  selectedProjects,
  setSelectedProjects,
}: {
  projects: Array<ProjectDetailsSchema>;
  selectedProjects: Array<string>;
  setSelectedProjects: Dispatch<Array<string> | SetStateAction<Array<string>>>;
}) => {
  const { windowSize } = useContext(SizeProviderContext);
  const {
    deletePopUp,
    enableCreateModel,
    onOpenCreateModel,
    onCloseCreateModel,
    onDeleteProjects,
    setDeletePopUp,
  } = useProject({ selectedProjects, setSelectedProjects });
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);

  return (
    <>
      <div className={`flex flex-col md:flex-row items-start gap-3`}>
        <div
          className={`flex flex-wrap flex-row md:flex-col flex-1 w-full justify-between md:justify-start gap-8`}
        >
          <Branding />
          {isMobile && <TitleTag name="project" />}
          <div
            id="project-header"
            className="flex flex-wrap items-center gap-3 w-full"
          >
            {!isMobile && <TitleTag name="project" />}
            <button
              className={`flex py-2 px-3 text-[12px] w-fit max-h-[40px] md:text-[14px] bg-success rounded-full text-black font-medium border-none hover:scale-105 items-center justify-center `}
              onClick={onOpenCreateModel}
            >
              {COMMON_TEXTS.NEW_PROJECT}
            </button>
            {selectedProjects.length > 0 && (
              <button
                className={`flex py-2 px-3 text-[12px] w-fit max-h-[40px] md:text-[14px] bg-red-600 rounded-full text-white font-medium border-none hover:scale-105 items-center justify-center `}
                onClick={() => setDeletePopUp(true)}
              >
                {COMMON_TEXTS.DELETE_PROJECT}
              </button>
            )}
          </div>
        </div>
        <SearchBar placeholder="Search your projects" />
      </div>
      <Modal isOpen={enableCreateModel} onClose={onCloseCreateModel}>
        <CreateProject onClose={onCloseCreateModel} projects={projects} />
      </Modal>
      <Modal isOpen={deletePopUp} onClose={() => setDeletePopUp(false)}>
        <DeletePopUp
          onCancel={() => setDeletePopUp(false)}
          onConfirm={onDeleteProjects}
        />
      </Modal>
    </>
  );
};

export default Header;
