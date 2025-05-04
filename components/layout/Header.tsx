import Logo from '@components/icons/Logo';
import ToggleThemeButton from '@components/ui/ToggleThemeButton';

const Header = () => {
  return (
    <header className='flex items-center justify-between px-3 py-2 mb-10 shadow-sm rounded-20 bg-neutral-0 dark:shadow-none dark:bg-neutral-800 md:px-4 md:py-3'>
      <h1>
        <Logo />
      </h1>
      <ToggleThemeButton />
    </header>
  );
};

export default Header;
