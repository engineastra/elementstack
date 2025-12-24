'use client';
import { QuestionLevel } from '@elementstack/shared-assets/Types';
import FilterCard, { ValueListType } from '@web-app/components/FilterCard';
import { Dispatch } from 'react';
import { TOPICS_TO_FEATURES } from '@elementstack/shared-assets/Constants';

const Filters = ({
  filterTopics,
  filterLevels,
  setFilterTopics,
  setFilterLevels,
}: {
  filterTopics: ValueListType[];
  filterLevels: ValueListType[];
  filterProgresses: ValueListType[];
  filterQuestionTypes: ValueListType[];
  setFilterTopics: Dispatch<ValueListType[]>;
  setFilterLevels: Dispatch<ValueListType[]>;
  setFilterProgresses: Dispatch<ValueListType[]>;
  setFilterQuestionTypes: Dispatch<ValueListType[]>;
}) => {
  return (
    <div className="flex flex-col w-full">
      <FilterCard
        name="Topics"
        isExpanded
        valueList={TOPICS_TO_FEATURES.map((obj) => ({
          id: obj.id,
          displayText: obj.topic,
        }))}
        selectedValues={filterTopics}
        onSelect={(val: ValueListType) => {
          if (filterTopics.some((topic) => topic.id === val.id)) {
            setFilterTopics(filterTopics.filter((obj) => obj.id !== val.id));
          } else {
            setFilterTopics([...filterTopics, val]);
          }
        }}
      />
      <FilterCard
        name="Level"
        valueList={Object.values(QuestionLevel).map((lvl) => ({
          id: 'level-' + lvl,
          displayText: lvl,
        }))}
        selectedValues={filterLevels}
        onSelect={(val: ValueListType) => {
          if (filterLevels.some((lvlObj) => lvlObj.id === val.id)) {
            setFilterLevels(
              filterLevels.filter((lvlObj) => lvlObj.id !== val.id)
            );
          } else {
            setFilterLevels([...filterLevels, val]);
          }
        }}
      />
    </div>
  );
};

export default Filters;
