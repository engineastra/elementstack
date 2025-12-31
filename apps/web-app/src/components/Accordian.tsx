'use client';
import { useEffect, useRef, useState } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { oxanium } from '@web-app/constants/Common';
import { COMMON_COLORS } from '@elementstack/shared-assets/Constants';

const Accordian = ({
  type,
  title,
  data,
  themeColor = COMMON_COLORS.primaryText,
}: {
  type: 'Bullet' | 'Chip';
  title: string;
  data: Array<string>;
  themeColor?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && divRef.current) {
      divRef.current.scrollIntoView();
    }
  }, [isExpanded]);

  return (
    <div ref={divRef}>
      <div
        className="flex justify-between items-center cursor-pointer mt-[15px]"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p
          className={`w-fit text-[13px] text-primaryText ${oxanium.className}`}
        >
          {title}
        </p>
        {isExpanded ? (
          <ExpandLess sx={{ fontSize: 20 }} />
        ) : (
          <ExpandMore sx={{ fontSize: 20 }} />
        )}
      </div>
      {isExpanded &&
        (type === 'Bullet' ? (
          <ul className="ml-4 mt-2">
            {data.map((val: string) => {
              return (
                <li
                  key={val}
                  className={`list-disc w-fit text-[13px] cursor-pointer text-secondaryText rounded-xl`}
                >
                  {val}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-wrap mt-4 gap-2">
            {data.map((val: string) => {
              return (
                <p
                  key={val}
                  className={`w-fit text-[13px] cursor-pointer px-2 py-1 border rounded-xl`}
                  style={{ color: themeColor, borderColor: themeColor }}
                >
                  {val}
                </p>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default Accordian;
