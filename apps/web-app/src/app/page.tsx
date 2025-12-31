import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import yrgDots from '@elementstack/shared-assets/images/yrgDots.svg';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import Image from 'next/image';
import OptionCard from '@web-app/components/OptionCard';
import Header from '@web-app/app/Header';
import { oxanium } from '@web-app/constants/Common';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';
import { Suspense } from 'react';
import SingleBoxPulse from '@web-app/components/skeletons/SingleBoxPulse';
import ProjectBanner from './ProjectBanner';
import MachineBanner from './MachineBanner';

export default function Home() {
  return (
    <div
      className={`flex flex-col min-h-[100vh] max-w-[1400px] ${oxanium.variable} px-5 py-4 pb-[30px]`}
    >
      <Header />
      <div className="flex lg:min-h-[78vh] items-center w-full py-7 lg:mt-[60px] flex-col lg:flex-row gap-[40px] lg:mb-[20px]">
        <div className="flex flex-col lg:max-w-[55%] lg:pl-[30px]">
          <p className="oxanium-font  text-primary font-bold text-[36px] lg:text-[56px]">
            {COMMON_TEXTS.TAG_LINE}
          </p>
          <p className="oxanium-font text-secondaryText font-medium text-[18px] lg:text-[24px]">
            {COMMON_TEXTS.SUB_TAG}
          </p>
          <div className="flex flex-wrap flex-1 py-5 gap-4">
            {Object.values(OPTION_CARDS).map((option) => {
              return <OptionCard key={option.id} cardDetails={option} />;
            })}
          </div>
        </div>
        <div className="hidden lg:flex flex-col h-[400px] lg:w-[450px] rounded-2xl overflow-hidden bg-pannel p-4 absolute right-0 scale-[130%] opacity-35">
          <Image width={40} src={yrgDots} alt="yrg-dots"></Image>
          <div className="flex pt-6 h-[95%] w-full *:pointer-events-none [&_.cm-gutters]:bg-pannel [&_.cm-editor]:bg-pannel overflow-hidden">
            <Suspense fallback={<SingleBoxPulse />}>
              <CodemirrorEditor
                extention="jsx"
                value={COMMON_TEXTS.HOME_EDITOR_DEFAULT_VALUE}
                readOnly
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[40px]">
        <ProjectBanner />
        <MachineBanner />
      </div>
    </div>
  );
}
