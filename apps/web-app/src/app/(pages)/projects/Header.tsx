'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import {
  AddBox,
  DeleteSweep,
  IndeterminateCheckBoxOutlined as Discard,
} from '@mui/icons-material';
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
import { oxanium } from '@web-app/constants/Common';

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
      <div
        className={`flex flex-wrap md:flex-row items-center gap-3 justify-between`}
      >
        {/* <SearchBar placeholder="Search your projects" /> */}
        <p
          className={`w-fit ${oxanium.className} ${
            isMobile ? 'text-[18px]' : 'text-[24px]'
          } text-primary font-medium`}
        >
          {COMMON_TEXTS.ALL_PROJECTS}
        </p>
        <div id="project-header" className="flex items-center gap-3">
          <button
            className={`flex py-2 px-3 text-[12px] w-fit max-h-[40px] md:text-[14px] border border-[#f1b863] rounded-full hover:scale-105 items-center justify-center`}
            onClick={onOpenCreateModel}
          >
            <AddBox
              sx={{
                height: '20px',
                width: '24px',
                cursor: 'pointer',
                ...iconColor('#f1b863'),
              }}
            />
            {!isMobile && (
              <p className="text-[#f1b863] font-medium">
                {COMMON_TEXTS.NEW_PROJECT}
              </p>
            )}
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
                {!isMobile && (
                  <p className="text-[#e54d38] font-medium">
                    {COMMON_TEXTS.DELETE}
                  </p>
                )}
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
                {!isMobile && (
                  <p className="text-[#e5c838] font-medium">
                    {COMMON_TEXTS.CANCEL}
                  </p>
                )}
              </button>
            </>
          )}
        </div>
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
