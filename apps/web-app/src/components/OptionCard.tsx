'use client';
import React from 'react';
import { OptionCardConfig } from '@elementstack/shared-assets/Constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OptionCard = ({ cardDetails }: { cardDetails: OptionCardConfig }) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-1 flex-col min-w-[120px] h-[150px] items-center gap-2 p-5 ${cardDetails.bgGrad} rounded-lg justify-around cursor-pointer hover:scale-105 transition-all`}
      onClick={() =>
        router.push(cardDetails.pathName)
      }
    >
      <Image
        className="inline w-14 h-14"
        src={cardDetails.icon}
        alt="app-logo"
      />
      <p
        className={`text-center text-[14px] font-semibold text-${cardDetails.textColor}`}
      >
        {cardDetails.title}
      </p>
    </div>
  );
};

export default OptionCard;
