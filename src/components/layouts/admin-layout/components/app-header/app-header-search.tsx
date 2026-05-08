import DebouncedInput from '@/components/ui/debounced-input';
import { useState } from 'react';

const AppHeaderSearch = () => {
  const [searchValue, setSearchValue] = useState<string | number>('');
  return (
    <div>
      <DebouncedInput
        placeholder='Search'
        className='h-8! md:w-80'
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
      />
    </div>
  );
};

export default AppHeaderSearch;
