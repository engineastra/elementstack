'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import Modal from 'apps/web-app/src/components/Modal';
import SearchBar from 'apps/web-app/src/components/SearchBar';
import CreateProject from 'apps/web-app/src/components/CreateProject';

const HeaderOptions = () => {
  const [parentEle, setParentEle] = useState<HTMLElement | null>(null);
  useEffect(() => {
    // runs only in browser after mount
    const el = document.getElementById('project-header');
    if (el) setParentEle(el);
  }, []);

  if (!parentEle) return null;
  return createPortal(
    <>
      <SearchBar placeholder="Search your projects" />
      <button className="py-2 px-5 text-[14px] theme-grad rounded-full text-black font-medium border-none hover:scale-105">
        {COMMON_TEXTS.NEW_FOLDER}
      </button>
      <button className="py-2 px-5 text-[14px] bg-red-500 rounded-full text-white font-medium border-none hover:scale-105">
        {COMMON_TEXTS.NEW_PROJECT}
      </button>
    </>,
    parentEle
  );
};

const Project = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateProject />
      </Modal>
      <HeaderOptions />
    </div>
  );
};

export default Project;
