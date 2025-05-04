import { useFilter } from '@/context/FilterProvider';

const Switch = ({ isActive, id }: { isActive: boolean; id: number }) => {
  const { toggleActive } = useFilter();

  const handleChange = () => {
    toggleActive(id);
  };

  return (
    <label className='inline-flex items-center cursor-pointer'>
      <input type='checkbox' value='' className='sr-only peer' checked={isActive} onChange={handleChange} />
      <div className="relative w-9 h-5 bg-neutral-300 transition-colors peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-neutral-0 dark:peer-focus:ring-offset-neutral-800 peer-focus:ring-red-700 dark:peer-focus:ring-red-400 rounded-full peer dark:bg-neutral-600 peer-checked:hover:bg-red-500 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-neutral-0 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700 dark:peer-checked:bg-red-400"></div>
    </label>
  );
};

export default Switch;
