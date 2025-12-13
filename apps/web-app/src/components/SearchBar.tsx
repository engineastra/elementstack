import Image from 'next/image';
import searchIcon from '@elementstack/shared-assets/icons/Search.svg';

type SearchBarProps = {
  name?: string;
  value?: string;
  placeholder?: string;
};

const SearchBar = ({ name, value, placeholder }: SearchBarProps) => {
  return (
    <div className="flex px-4 rounded-full bg-greenishgrey text-[14px] min-h-10 w-full lg:w-[300px]">
      <input
        type="text"
        className="flex flex-1 bg-transparent outline-none placeholder:text-secondaryText"
        name={name}
        value={value}
        placeholder={placeholder}
      />
      <Image className="w-4" src={searchIcon} alt="search" />
    </div>
  );
};

export default SearchBar;
