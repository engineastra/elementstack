'use client';
import { ReactNode, useContext } from 'react';
import { Branding } from '../Header';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

const CommonLayout = ({ children }: { children: ReactNode }) => {
  const { windowSize } = useContext(SizeProviderContext);
  const isMobile = [DEVICE_SIZES.xsm, DEVICE_SIZES.sm].includes(windowSize);
  const pathName = usePathname();
  const router = useRouter();
  if (
    !Object.values(OPTION_CARDS)
      .map((obj) => obj.pathName)
      .includes(pathName.slice(1, pathName.length))
  )
    return children;
  return (
    <div className="feature-grad flex flex-col items-stretch md:items-start md:flex-row h-[100vh] overflow-y-scroll md:overflow-y-hidden p-3 gap-2">
      {isMobile && (
        <div className="flex w-full justify-center py-[15px]">
          <Branding full />
        </div>
      )}
      <div className="flex items-center flex-row md:flex-col h-full w-full md:w-[300px] p-2 md:p-3 md:pt-[25px] border border-greenishgrey rounded-xl">
        {!isMobile && <Branding />}
        <nav className="flex flex-1 flex-row md:flex-col w-full px-2 md:py-4 gap-3 md:mt-[50px]">
          {Object.entries(OPTION_CARDS).map(([key, value]) => {
            return (
              <div
                key={key}
                className={`flex w-full h-[45px] gap-2 justify-center items-center cursor-pointer ${
                  value.bgGrad
                } rounded-lg ${
                  pathName.slice(1) === value.pathName
                    ? `border-2 border-${value.textColor}`
                    : ''
                }`}
                onClick={() => router.push(value.pathName)}
              >
                <Image
                  className="inline w-4 h-4"
                  src={value.icon}
                  alt={value.title}
                />
                {!isMobile && (
                  <p
                    className={`text-center text-[12px] md:text-[14px] font-semibold text-${value.textColor}`}
                  >
                    {value.title}
                  </p>
                )}
              </div>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-1 h-full min-w-0">{children}</div>
    </div>
  );
};

export default CommonLayout;
