'use client';
import { usePathname } from 'next/navigation';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import logo from '@elementstack/shared-assets/icons/Logo.svg';
import Image from 'next/image';
import ROUTES from '@web-app/constants/Routes';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';
import { useContext } from 'react';

export const Branding = ({ full }: { full?: boolean }) => {
  const { windowSize } = useContext(SizeProviderContext);
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);
  return (
    <div id="full-logo" className={`flex gap-1 md:gap-2 items-center`}>
      <Image className="inline w-5" src={logo} alt="app-logo" />
      {(!isMobile || full) && (
        <p className="text-primary text-[16px] font-medium tracking-wide">
          {COMMON_TEXTS.APP_NAME}
        </p>
      )}
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  const isHeaderAlignRow = pathname === ROUTES.PROJECT;
  return (
    <>
      <div
        className={`flex w-full ${
          isHeaderAlignRow ? 'flex-col' : 'flex-row'
        } lg:flex-row justify-between items-center gap-3`}
      >
        <Branding />
        <nav className="flex items-center gap-3 flex-col lg:flex-row-reverse">
          <div className="flex py-1 px-2 bg-card rounded-full">
            <button className="py-2 px-5 text-sm theme-grad rounded-full text-black font-semibold border-none hover:scale-110">
              {COMMON_TEXTS.LOGIN}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
