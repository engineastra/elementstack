import Image from 'next/image';
import searchIcon from '@elementstack/shared-assets/icons/Search.svg';

type SearchBarProps = {
  name?: string;
  value?: string;
  placeholder?: string;
  width?: string;
};

const SearchBar = ({ name, value, placeholder, width }: SearchBarProps) => {
  return (
    <div
      className={`flex h-[40px] px-4 rounded-full bg-greenishgrey text-[12px] md:text-[14px] min-w-full lg:min-w-[400px] ${
        width || ''
      }`}
    >
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
