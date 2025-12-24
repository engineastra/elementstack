'use client';
import debounce from 'lodash/debounce';
import { FilterAlt, FilterAltOff } from '@mui/icons-material';
import { MachineQuestionMeta } from '@elementstack/shared-assets/Types';
import QuestionCard from './QuestionCard';
import Filters from './Filters';
import { useContext, useEffect, useState } from 'react';
import { ValueListType } from '@web-app/components/FilterCard';
import { TOPICS_TO_FEATURES } from '@elementstack/shared-assets/Constants';
import Header from './Header';
import SearchBar from '@web-app/components/SearchBar';
import {
  DEVICE_SIZES,
  SizeProviderContext,
} from '@web-app/contexts/SizeProvider';

const AllQuestions = ({ questions }: { questions: MachineQuestionMeta[] }) => {
  const { windowSize } = useContext(SizeProviderContext);
  const isTablet = [
    DEVICE_SIZES.xsm,
    DEVICE_SIZES.sm,
    DEVICE_SIZES.md,
  ].includes(windowSize);
  const [filteredQuestions, setFilteredQuestions] = useState<
    MachineQuestionMeta[]
  >([]);
  const [filterTopics, setFilterTopics] = useState<ValueListType[]>([]);
  const [filterLevels, setFilterLevels] = useState<ValueListType[]>([]);
  const [filterProgresses, setFilterProgresses] = useState<ValueListType[]>([]);
  const [filterQuestionTypes, setFilterQuestionTypes] = useState<
    ValueListType[]
  >([]);
  const [searchKey, setSearchKey] = useState('');
  const [filterToggle, setFilterToggle] = useState(false);

  const debouncedSearch = debounce(
    (val: string) => setSearchKey(val.toLowerCase()),
    200
  );

  useEffect(() => {
    let newList = [
      ...questions.filter(
        (ques) =>
          (!searchKey ||
            ques.title.toLocaleLowerCase().includes(searchKey) ||
            ques.quickDescription.toLocaleLowerCase().includes(searchKey)) &&
          (!filterTopics.length ||
            filterTopics.some((top) =>
              ques.keyFeatures.some((feature) =>
                TOPICS_TO_FEATURES.find(
                  (lst) => lst.id === top.id
                )?.features?.includes(feature)
              )
            )) &&
          (!filterLevels.length ||
            filterLevels.some((lvlObj) => lvlObj.displayText === ques.level))
      ),
    ];
    if (!filterTopics.length && !filterLevels.length && !newList.length) {
      newList = [...questions];
    }
    setFilteredQuestions(newList);
  }, [
    filterTopics,
    filterLevels,
    filterProgresses,
    filterQuestionTypes,
    questions,
    searchKey,
  ]);

  return (
    <div className="relative lg:static flex flex-col lg:flex-row gap-2 pt-3 overflow-y-auto">
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
          placeholder="Search questions"
          themeColor="machine-500"
          onSearch={debouncedSearch}
        />
        <div className="flex flex-col flex-1 gap-[10px] ">
          {filteredQuestions.map((ques) => {
            return <QuestionCard key={ques.id} questionData={ques} />;
          })}
        </div>
      </div>
      {(!isTablet || filterToggle) && (
        <div className="absolute lg:sticky top-[58px] lg:top-0 right-0 flex md:flex-[0.4] lg:mt-12 bg-black lg:bg-transparent border border-greenishgrey lg:border-transparent p-2 rounded-xl">
          <div className="w-full overflow-y-auto">
            <Filters
              filterTopics={filterTopics}
              filterLevels={filterLevels}
              filterProgresses={filterProgresses}
              filterQuestionTypes={filterQuestionTypes}
              setFilterTopics={setFilterTopics}
              setFilterLevels={setFilterLevels}
              setFilterProgresses={setFilterProgresses}
              setFilterQuestionTypes={setFilterQuestionTypes}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllQuestions;
