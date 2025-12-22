'use client';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import { useContext } from 'react';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { oxanium } from '@web-app/constants/Common';

const Header = () => {
  const { windowSize } = useContext(SizeProviderContext);
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);

  return (
    <>
      <div
        className={`flex flex-wrap md:flex-row items-center gap-3 justify-between`}
      >
        {/* <SearchBar placeholder="Search questions" /> */}
        <p
          className={`w-fit ${oxanium.className} ${
            isMobile ? 'text-[18px]' : 'text-[24px]'
          } text-primary font-medium`}
        >
          {COMMON_TEXTS.PEER_CODE}
        </p>
      </div>
    </>
  );
};

export default Header;
