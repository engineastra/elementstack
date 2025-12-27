import COMMON_TEXTS from '@elementstack/shared-assets/CommonTexts';
import yrgDots from '@elementstack/shared-assets/images/yrgDots.svg';
import { OPTION_CARDS } from '@elementstack/shared-assets/Constants';
import Image from 'next/image';
import OptionCard from '@web-app/components/OptionCard';
import Header from '@web-app/app/Header';
import { oxanium } from '@web-app/constants/Common';
import CodemirrorEditor from '@web-app/components/CodemirrorEditor';

export default function Home() {
  return (
    <div
      className={`flex flex-col min-h-[100vh] max-w-[1400px] ${oxanium.variable} px-5 py-4`}
    >
      <Header />
      <div className="flex min-h-[80vh] justify-around w-full py-7 lg:mt-[100px] flex-col lg:flex-row gap-[40px]">
        <div className="flex flex-col lg:max-w-[55%]">
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
        <div className="flex flex-col md:h-[400px] rounded-2xl overflow-hidden bg-pannel p-4">
          <Image width={40} src={yrgDots} alt="yrg-dots"></Image>
          <div className="flex pt-6 h-[95%] *:pointer-events-none [&_.cm-gutters]:bg-pannel [&_.cm-editor]:bg-pannel max-w-[80vw] md:max-w-[450px] overflow-hidden">
            <CodemirrorEditor
              extention="jsx"
              value={COMMON_TEXTS.HOME_EDITOR_DEFAULT_VALUE}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
