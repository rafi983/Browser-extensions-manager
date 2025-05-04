import { ExtensionType, useFilter } from '@/context/FilterProvider';
import Image from 'next/image';
import Switch from './ui/Switch';

const ExtensionItem = ({ extension }: { extension: ExtensionType }) => {
  const { deleteExtension } = useFilter();

  const handleDelete = () => {
    deleteExtension(extension.id);
  };

  return (
    <li className='flex flex-col justify-between p-5 rounded-20 bg-neutral-0 border-1 border-neutral-200 h-[200px] dark:bg-neutral-800 dark:border-neutral-600 shadow-md dark:shadow-none'>
      <div className='grid grid-cols-[60px_1fr] gap-4'>
        <Image src={extension.logo} width={60} height={60} alt='' />
        <div>
          <h3 className='text-preset-2 text-neutral-900 mb-2 dark:text-neutral-0'>{extension.name}</h3>
          <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>{extension.description}</p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <button
          type='button'
          onClick={handleDelete}
          className='text-preset-6 h-[38px] px-4 rounded-full text-neutral-900 cursor-pointer border-1 transition-colors hover:text-neutral-0 dark:hover:text-neutral-900 hover:bg-red-700 dark:hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-0 dark:focus:ring-offset-neutral-800 focus:ring-red-700 dark:focus:ring-red-400 border-neutral-300 dark:border-neutral-600 dark:text-neutral-0'
        >
          Remove
        </button>
        <Switch isActive={extension.isActive} id={extension.id} />
      </div>
    </li>
  );
};

export default ExtensionItem;
