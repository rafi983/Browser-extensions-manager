import ToggleThemeButton from '@components/ui/ToggleThemeButton';

const Header = () => {
  return (
    <header className='mb-6 flex items-center justify-between rounded-20 bg-neutral-0 px-4 py-3 shadow-sm dark:bg-neutral-800 dark:shadow-none md:mb-8 md:px-5 md:py-4'>
      <div>
        <h1 className='text-lg font-bold text-neutral-900 dark:text-neutral-0'>Extension Control Center</h1>
        <p className='text-xs uppercase tracking-[0.14em] text-neutral-600 dark:text-neutral-300'>
          Personal browser toolkit
        </p>
      </div>
      <ToggleThemeButton />
    </header>
  );
};

export default Header;
