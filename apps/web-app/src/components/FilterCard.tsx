'use client';
import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

export type ValueListType = { id: string; displayText: string };

const FilterCard = ({
  name,
  themeColor = 'primary',
  valueList,
  selectedValues,
  isExpanded = false,
  onSelect,
}: {
  name: string;
  themeColor?: string;
  valueList: ValueListType[];
  selectedValues: ValueListType[];
  isExpanded?: boolean;
  onSelect: (val: ValueListType) => void;
}) => {
  const [expand, setExpand] = useState(isExpanded);
  return (
    <div className="flex flex-col w-full h-fit p-2 gap-[15px]">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpand(!expand)}
      >
        <p className="pl-1 w-fit text-[16px] text-primaryText">{name}</p>
        {expand ? (
          <ExpandLess sx={{ fontSize: 20 }} />
        ) : (
          <ExpandMore sx={{ fontSize: 20 }} />
        )}
      </div>
      {expand && (
        <div className="flex w-full flex-wrap gap-2">
          {valueList.map((val: ValueListType) => {
            if (!val) return <></>;
            return (
              <p
                key={val.id}
                className={`w-fit text-[12px] cursor-pointer text-${
                  selectedValues.some(
                    (selectedVal) => selectedVal?.id === val.id
                  )
                    ? themeColor
                    : 'secondaryText'
                } px-2 py-1 rounded-2xl border border-${
                  selectedValues.some(
                    (selectedVal) => selectedVal?.id === val.id
                  )
                    ? themeColor
                    : 'secondaryText'
                }`}
                onClick={() => onSelect(val)}
              >
                {val.displayText}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FilterCard;
