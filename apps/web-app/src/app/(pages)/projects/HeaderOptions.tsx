'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import SearchBar from '@web-app/components/SearchBar';
import { useProject } from '../../../hooks/useProject';
import Modal from '@web-app/components/Modal';
import CreateProject from './CreateProject';

const HeaderOptions = () => {
  const { enableCreateModel, onOpenCreateModel, onCloseCreateModel } =
    useProject();
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
      <button
        className="py-2 px-5 text-[14px] bg-red-500 rounded-full text-white font-medium border-none hover:scale-105"
        onClick={onOpenCreateModel}
      >
        {COMMON_TEXTS.NEW_PROJECT}
      </button>
      <Modal isOpen={enableCreateModel} onClose={onCloseCreateModel}>
        <CreateProject onClose={onCloseCreateModel} />
      </Modal>
    </>,
    parentEle
  );
};

export default HeaderOptions;
