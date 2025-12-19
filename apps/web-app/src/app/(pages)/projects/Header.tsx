'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import Image from 'next/image';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import { Branding } from '@web-app/app/Header';
import SearchBar from '@web-app/components/SearchBar';
import { useProject } from '@web-app/hooks/useProject';
import Modal from '@web-app/components/Modal';
import CreateProject from './CreateProject';

const TitleTag = ({ name }: { name: string }) => {
  return (
    <div
      className={`flex flex-shrink-0 w-fit gap-1 items-center h-fit px-8 py-2 rounded-lg ${OPTION_CARDS[name].bgGrad}`}
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

const Header = () => {
  const { enableCreateModel, onOpenCreateModel, onCloseCreateModel } =
    useProject();

  return (
    <>
      <div
        className={`flex flex-col lg:flex-row justify-between items-center gap-3`}
      >
        <div className='hidden lg:flex'><Branding /></div>
        <div
          className={`flex flex-1 w-full justify-between md:justify-start gap-2`}
        >
          <div className="flex lg:hidden mr-auto">
            <Branding hideName />
          </div>
          <TitleTag name="project" />
          <div
            id="project-header"
            className="flex justify-between items-center"
          >
            <button
              className="flex py-2 px-3 text-[12px] w-fit max-h-[40px] md:text-[14px] bg-success rounded-full text-black font-medium border-none hover:scale-105 items-center justify-center"
              onClick={onOpenCreateModel}
            >
              {COMMON_TEXTS.NEW_PROJECT}
            </button>
          </div>
        </div>
        <SearchBar placeholder="Search your projects" />
      </div>
      <Modal isOpen={enableCreateModel} onClose={onCloseCreateModel}>
        <CreateProject onClose={onCloseCreateModel} />
      </Modal>
    </>
  );
};

export default Header;
