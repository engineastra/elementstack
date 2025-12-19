'use client';
import { usePathname } from 'next/navigation';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import logo from '@elementstack/shared-assets/icons/Logo.svg';
import Image from 'next/image';
import ROUTES from '@web-app/constants/Routes';

export const Branding = ({
  hide = false,
  hideName = false,
}: {
  hide?: boolean;
  hideName?: boolean;
}) => {
  if (hide) return;
  return (
    <div id="full-logo" className={`flex gap-1 md:gap-2 items-center`}>
      <Image className="inline w-6 md:w-7" src={logo} alt="app-logo" />
      {!hideName && (
        <p className="text-primary text-[16px] md:text-[20px] font-medium tracking-wide">
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
