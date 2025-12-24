import { Search as SearchIcon } from '@mui/icons-material';

type SearchBarProps = {
  name?: string;
  value?: string;
  placeholder?: string;
  height?: string;
  width?: string;
  themeColor?: string;
  bgColor?: string;
  onSearch: (val: string) => void;
};

const SearchBar = ({
  name,
  value,
  placeholder,
  height = '45px',
  width = '100%',
  themeColor = 'primary',
  bgColor = 'greenishgrey',
  onSearch,
}: SearchBarProps) => {
  return (
    <div
      className={`flex shrink-0 w-[${width}] min-h-[${height}] h-[45px] px-5 rounded-full bg-${bgColor} *:text-[13px] items-center`}
    >
      <input
        type="text"
        className={`flex flex-1 bg-transparent outline-none text-${themeColor} placeholder:text-secondaryText`}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
      <SearchIcon sx={{ fontSize: 20 }} />
    </div>
  );
};

export default SearchBar;
