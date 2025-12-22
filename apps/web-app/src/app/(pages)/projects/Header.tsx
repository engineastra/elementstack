'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import Image from 'next/image';
import {
  AddBox,
  DeleteSweep,
  IndeterminateCheckBoxOutlined as Discard,
} from '@mui/icons-material';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import { Branding } from '@web-app/app/Header';
import SearchBar from '@web-app/components/SearchBar';
import { useProject } from '@web-app/hooks/useProject';
import Modal from '@web-app/components/Modal';
import CreateProject from './CreateProject';
import { ProjectDetailsSchema } from '@elementstack/shared-assets/Types';
import { Dispatch, SetStateAction, useContext } from 'react';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { iconColor } from '@web-app/utils/commonUtils';
import DeletePopUp from '@web-app/components/DeletePopUp';

const TitleTag = ({ name }: { name: string }) => {
  return (
    <div
    className={`flex flex-shrink-0 w-fit gap-1 items-center h-fit px-8 py-2 rounded-sm project-grad border border-project`}
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
    onDiscardProjects,
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
              className={`flex py-2 px-3 text-[12px] w-fit max-h-[40px] md:text-[14px] border border-primary rounded-full hover:scale-105 items-center justify-center`}
              onClick={onOpenCreateModel}
            >
              <AddBox
                sx={{
                  height: '20px',
                  width: '24px',
                  cursor: 'pointer',
                  ...iconColor('#71f163'),
                }}
              />
              <p className="text-primary font-medium">
                {COMMON_TEXTS.NEW_PROJECT}
              </p>
            </button>
            {selectedProjects.length > 0 && (
              <>
                <button
                  className={`flex py-2 px-3 w-fit max-h-[40px] md:text-[14px] border border-red-500 rounded-full text-white font-medium hover:scale-105 items-center justify-center `}
                  onClick={() => setDeletePopUp(true)}
                >
                  <DeleteSweep
                    sx={{
                      height: '20px',
                      width: '24px',
                      cursor: 'pointer',
                      ...iconColor('#e54d38'),
                    }}
                  />
                  <p className="text-[#e54d38] font-medium">
                    {COMMON_TEXTS.DELETE}
                  </p>
                </button>
                <button
                  className={`flex py-2 px-3 w-fit max-h-[40px] md:text-[14px] border border-[#e5c838] rounded-full text-white font-medium hover:scale-105 items-center justify-center `}
                  onClick={onDiscardProjects}
                >
                  <Discard
                    sx={{
                      height: '20px',
                      width: '24px',
                      cursor: 'pointer',
                      ...iconColor('#e5c838'),
                    }}
                  />
                  <p className="text-[#e5c838] font-medium">
                    {COMMON_TEXTS.DISCARD}
                  </p>
                </button>
              </>
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
