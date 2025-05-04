'use client';

import { useFilter } from '@/context/FilterProvider';

const FilterButton = ({ text }: { text: 'All' | 'Active' | 'Inactive' }) => {
  const {
    state: { filter },
    setFilter,
  } = useFilter();

  const isActive = filter === text;
  const activeClass = isActive
    ? 'text-preset-4 text-neutral-0 bg-red-700 hover:bg-red-500 dark:hover:bg-red-500 dark:text-neutral-900 dark:bg-red-400'
    : 'text-preset-3 text-neutral-900 bg-neutral-0 border-neutral-200 shadow-sm hover:opacity-70 dark:hover:opacity-100 dark:hover:bg-neutral-600 dark:text-neutral-0 dark:bg-neutral-700 border-1 dark:border-neutral-600 dark:shadow-none';

  return (
    <button
      type='button'
      onClick={() => setFilter(text)}
      className={`h-[46px] rounded-full px-5 grid place-items-center cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-0 dark:focus:ring-offset-neutral-800 focus:ring-red-700 dark:focus:ring-red-400 ${activeClass}`}
    >
      {text}
    </button>
  );
};

export default FilterButton;
