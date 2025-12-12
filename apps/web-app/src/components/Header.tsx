import React from 'react';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import logo from '@elementstack/shared-assets/icons/Logo.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <div className="flex justify-between">
        <div id="full-logo" className="flex gap-2 items-center">
          <Image className="inline w-7 h-7" src={logo} alt="app-logo" />
          <p className="hidden lg:inline text-primary text-[20px] font-medium tracking-wide">
            {COMMON_TEXTS.APP_NAME}
          </p>
        </div>
        <nav className="flex py-1 px-2 bg-card rounded-full">
          <button className="py-2 px-5 text-sm theme-grad rounded-full text-black font-semibold">
            {COMMON_TEXTS.LOGIN}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
