'use client';
import { usePathname } from 'next/navigation';
import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import logo from '@elementstack/shared-assets/icons/Logo.svg';
import Image from 'next/image';
import ROUTES from '../constants/Routes';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';

const TitleTag = ({ name }: { name: string }) => {
  return (
    <div
      className={`flex flex-shrink-0 w-fit gap-1 items-center h-fit px-3 py-2 rounded-lg ${OPTION_CARDS[name].bgGrad}`}
    >
      <Image
        className="inline w-4 h-4"
        src={OPTION_CARDS[name].icon}
        alt={OPTION_CARDS[name].title}
      />
      <p
        className={`text-center text-[14px] font-semibold text-${OPTION_CARDS[name].textColor}`}
      >
        {OPTION_CARDS[name].title}
      </p>
    </div>
  );
};

const Branding = ({ hide = false }: { hide?: boolean }) => {
  const pathname = usePathname();
  if (hide) return;
  return (
    <div
      id="full-logo"
      className={`${
        pathname === ROUTES.HOME ? 'flex' : 'hidden'
      } lg:flex gap-2 items-center`}
    >
      <Image className="inline w-7 h-7" src={logo} alt="app-logo" />
      <p className="text-primary text-[20px] font-medium tracking-wide">
        {COMMON_TEXTS.APP_NAME}
      </p>
    </div>
  );
};

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex justify-between flex-col lg:flex-row">
        <Branding />
        <nav className="flex items-center gap-3 flex-col lg:flex-row">
          {pathname === ROUTES.HOME && (
            <div className="flex py-1 px-2 bg-card rounded-full">
              <button className="py-2 px-5 text-sm theme-grad rounded-full text-black font-semibold border-none hover:scale-110">
                {COMMON_TEXTS.LOGIN}
              </button>
            </div>
          )}
          {pathname === ROUTES.PROJECT && (
            <>
              <TitleTag name="project" />
              <div
                id="project-header"
                className="flex w-full py-2 px-3 lg:bg-card lg:rounded-full gap-2 flex-col lg:flex-row"
              ></div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
