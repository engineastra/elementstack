'use client';
import { QuestionLevel } from '@elementstack/shared-assets/Types';
import FilterCard, { ValueListType } from '@web-app/components/FilterCard';
import { Dispatch } from 'react';
import {
  COMMON_COLORS,
  DSA_CONSTANTS,
} from '@elementstack/shared-assets/Constants';
import { capitalizeFirst } from '@web-app/utils/commonUtils';

const Filters = ({
  filterCategory,
  filterConcepts,
  filterLevels,
  filterCompanyTags,
  filterTopics,
  setFilterCategory,
  setFilterConcepts,
  setFilterLevels,
  setFilterCompanyTags,
  setFilterTopics,
}: {
  filterCategory: ValueListType[];
  filterConcepts: ValueListType[];
  filterCompanyTags: ValueListType[];
  filterLevels: ValueListType[];
  filterProgresses: ValueListType[];
  filterQuestionTypes: ValueListType[];
  filterTopics: ValueListType[];
  setFilterCategory: Dispatch<ValueListType[]>;
  setFilterConcepts: Dispatch<ValueListType[]>;
  setFilterLevels: Dispatch<ValueListType[]>;
  setFilterProgresses: Dispatch<ValueListType[]>;
  setFilterQuestionTypes: Dispatch<ValueListType[]>;
  setFilterCompanyTags: Dispatch<ValueListType[]>;
  setFilterTopics: Dispatch<ValueListType[]>;
}) => {
  return (
    <div className="flex flex-col w-full">
      <FilterCard
        name="Categories"
        themeColor={COMMON_COLORS.problems[500]}
        isExpanded
        valueList={DSA_CONSTANTS.categories.map((val) => ({
          id: val,
          displayText: val,
        }))}
        selectedValues={filterCategory}
        onSelect={(val: ValueListType) => {
          if (filterCategory.some((topic) => topic.id === val.id)) {
            setFilterCategory(
              filterCategory.filter((obj) => obj.id !== val.id)
            );
          } else {
            setFilterCategory([...filterCategory, val]);
          }
        }}
      />
      <FilterCard
        name="Related Topics"
        themeColor={COMMON_COLORS.problems[500]}
        valueList={DSA_CONSTANTS.relatedTopics.map((val) => ({
          id: val,
          displayText: val
            .split('-')
            .reduce((acc, val) => acc + ' ' + capitalizeFirst(val), '')
            .trim(),
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
        name="Companies"
        themeColor={COMMON_COLORS.problems[500]}
        valueList={DSA_CONSTANTS.companyTags.map((val) => ({
          id: val,
          displayText: val,
        }))}
        selectedValues={filterCompanyTags}
        onSelect={(val: ValueListType) => {
          if (filterCompanyTags.some((topic) => topic.id === val.id)) {
            setFilterCompanyTags(
              filterCompanyTags.filter((obj) => obj.id !== val.id)
            );
          } else {
            setFilterCompanyTags([...filterCompanyTags, val]);
          }
        }}
      />
      <FilterCard
        name="Concepts"
        themeColor={COMMON_COLORS.problems[500]}
        valueList={DSA_CONSTANTS.keyConcepts.map((val) => ({
          id: val,
          displayText: val,
        }))}
        selectedValues={filterConcepts}
        onSelect={(val: ValueListType) => {
          if (filterConcepts.some((topic) => topic.id === val.id)) {
            setFilterConcepts(
              filterConcepts.filter((obj) => obj.id !== val.id)
            );
          } else {
            setFilterConcepts([...filterConcepts, val]);
          }
        }}
      />
      <FilterCard
        name="Level"
        themeColor={COMMON_COLORS.problems[500]}
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
