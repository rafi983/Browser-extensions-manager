'use client';

import { useFilter } from '@/context/FilterProvider';
import ExtensionItem from './ExtensionItem';

const ExtensionsList = () => {
  const {
    state: { extensions },
  } = useFilter();

  return (
    <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
      {extensions.map((extension) => (
        <ExtensionItem key={extension.id} extension={extension} />
      ))}
    </ul>
  );
};

export default ExtensionsList;
