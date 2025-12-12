import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import { Oxanium } from 'next/font/google';
import yrgDots from '@elementstack/shared-assets/images/yrgDots.svg';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import Image from 'next/image';
import Header from '../components/Header';
import OptionCard from '../components/OptionCard';
import Editor from '../components/Editor';

export const oxanium = Oxanium({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oxanium', // Optional CSS variable
  weight: ['300', '400', '700'], // Choose weights as needed
});

export default function Index() {
  return (
    <div className={`flex flex-col min-h-[100vh] p-5 ${oxanium.variable}`}>
      <Header />
      <div className="flex min-h-[90vh] justify-start items-center w-full py-7 lg:px-10 flex-col lg:flex-row">
        <div className="flex flex-col lg:px-5 lg:max-w-[55%]">
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
        <div className="relative lg:absolute h-[400px] w-full lg:w-[35vw]  rounded-2xl lg:right-10 overflow-hidden padding: 2rem; codebanner-bg-wrapper p-4">
          <Image width={40} src={yrgDots} alt="yrg-dots"></Image>
          <div className="pt-6 h-[90%]">
            <Editor value={COMMON_TEXTS.HOME_EDITOR_DEFAULT_VALUE} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
