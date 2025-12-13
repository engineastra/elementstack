'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [modalEle, setModalEle] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // runs only in browser after mount
    const el = document.getElementById('modal');
    if (el) setModalEle(el);
    // add outside click event listener
    const handleOutsideClick = function (e: Event) {
      const modalBgEle = document.querySelector('.modal-bg');
      if (e.target === modalBgEle) {
        onClose();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  if (!modalEle || !isOpen) return null;

  return createPortal(
    <div className="modal-bg flex h-[100vh] w-[100vw] feature-grad opacity-80 justify-center items-center">
      <div className="flex p-4 rounded-3xl bg-pannel border border-primary">
        {children}
      </div>
    </div>,
    modalEle
  );
};

export default Modal;
