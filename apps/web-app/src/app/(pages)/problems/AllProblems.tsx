'use client';
import debounce from 'lodash/debounce';
import {
  List as FixedSizeList,
  type RowComponentProps,
  useDynamicRowHeight,
} from 'react-window';
import { FilterAlt, FilterAltOff } from '@mui/icons-material';
import { DsaProblemMeta } from '@elementstack/shared-assets/Types';
import ProblemCard from './ProblemCard';
import Filters from './Filters';
import { useContext, useEffect, useState } from 'react';
import { ValueListType } from '@web-app/components/FilterCard';
import Header from './Header';
import SearchBar from '@web-app/components/SearchBar';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

const AllProblems = ({ problems }: { problems: DsaProblemMeta[] }) => {
  const { windowSize } = useContext(SizeProviderContext);
  const isTablet = [
    DEVICE_SIZES.xsm,
    DEVICE_SIZES.sm,
    DEVICE_SIZES.md,
  ].includes(windowSize);
  const [filteredQuestions, setFilteredQuestions] = useState<DsaProblemMeta[]>(
    []
  );
  const [filterCategory, setFilterCategory] = useState<ValueListType[]>([]);
  const [filterTopics, setFilterTopics] = useState<ValueListType[]>([]);
  const [filterConcepts, setFilterConcepts] = useState<ValueListType[]>([]);
  const [filterCompanyTags, setFilterCompanyTags] = useState<ValueListType[]>(
    []
  );
  const [filterLevels, setFilterLevels] = useState<ValueListType[]>([]);
  const [filterProgresses, setFilterProgresses] = useState<ValueListType[]>([]);
  const [filterQuestionTypes, setFilterQuestionTypes] = useState<
    ValueListType[]
  >([]);
  const [searchKey, setSearchKey] = useState('');
  const [filterToggle, setFilterToggle] = useState(false);
  const questionRowHeight = useDynamicRowHeight({
    defaultRowHeight: 50,
  });

  const debouncedSearch = debounce(
    (val: string) => setSearchKey(val.toLowerCase()),
    200
  );

  useEffect(() => {
    let newList = [
      ...problems.filter(
        (ques) =>
          (!searchKey ||
            ques.title.toLocaleLowerCase().includes(searchKey) ||
            ques.quickDescription.toLocaleLowerCase().includes(searchKey)) &&
          (!filterCategory.length ||
            filterCategory.some((val) => ques.category.includes(val.id))) &&
          (!filterConcepts.length ||
            filterConcepts.some((val) =>
              ques.keyConcepts.includes(val.displayText)
            )) &&
          (!filterTopics.length ||
            filterTopics.some((val) => ques.relatedTopics.includes(val.id))) &&
          (!filterCompanyTags.length ||
            filterCompanyTags.some((val) =>
              ques.companyTags.includes(val.displayText)
            )) &&
          (!filterLevels.length ||
            filterLevels.some((lvlObj) => lvlObj.displayText === ques.level))
      ),
    ];
    if (!filterConcepts.length && !filterLevels.length && !newList.length) {
      newList = [...problems];
    }
    setFilteredQuestions(newList);
  }, [
    filterCategory,
    filterTopics,
    filterConcepts,
    filterCompanyTags,
    filterLevels,
    filterProgresses,
    filterQuestionTypes,
    problems,
    searchKey,
  ]);

  return (
    <div className="relative lg:static flex flex-col lg:flex-row gap-2 pt-3 md:overflow-y-auto">
      <div className="flex flex-col md:flex-[0.6] p-2 gap-3">
        <div className="flex justify-between items-center px-2">
          <Header />
          {isTablet && (
            <span
              className="cursor-pointer"
              onClick={() => setFilterToggle(!filterToggle)}
            >
              {filterToggle ? (
                <FilterAltOff sx={{ fontSize: 20 }} />
              ) : (
                <FilterAlt sx={{ fontSize: 20 }} />
              )}
            </span>
          )}
        </div>
        <SearchBar
          placeholder="Search problems"
          themeColor="problems-500"
          onSearch={debouncedSearch}
        />
        <div className="flex flex-col flex-1 gap-[10px]">
          <FixedSizeList
            rowCount={filteredQuestions.length}
            rowHeight={questionRowHeight}
            rowProps={{ problems: filteredQuestions }}
            rowComponent={({
              index,
              style,
              problems,
            }: RowComponentProps<{
              problems: DsaProblemMeta[];
            }>) => {
              return (
                <div style={style}>
                  <ProblemCard
                    key={problems[index].id}
                    problemData={problems[index]}
                  />
                </div>
              );
            }}
          />
        </div>
      </div>
      {(!isTablet || filterToggle) && (
        <div className="absolute lg:sticky top-[58px] lg:top-0 right-0 flex md:flex-[0.4] md:h-full bg-black lg:bg-transparent border border-greenishgrey lg:border-transparent p-2 rounded-xl">
          <div className="w-full overflow-y-auto">
            <Filters
              filterConcepts={filterConcepts}
              filterLevels={filterLevels}
              filterProgresses={filterProgresses}
              filterQuestionTypes={filterQuestionTypes}
              filterCompanyTags={filterCompanyTags}
              filterTopics={filterTopics}
              filterCategory={filterCategory}
              setFilterConcepts={setFilterConcepts}
              setFilterLevels={setFilterLevels}
              setFilterProgresses={setFilterProgresses}
              setFilterQuestionTypes={setFilterQuestionTypes}
              setFilterCompanyTags={setFilterCompanyTags}
              setFilterTopics={setFilterTopics}
              setFilterCategory={setFilterCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProblems;
