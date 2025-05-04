'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type='button'
      onClick={handleToggleTheme}
      className='grid place-items-center w-[50px] h-[50px] rounded-12 cursor-pointer transition-colors bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-0 dark:focus:ring-offset-neutral-800 focus:ring-red-700 dark:focus:ring-red-400'
    >
      <Image src={theme === 'light' ? '/assets/icon-moon.svg' : '/assets/icon-sun.svg'} width={22} height={22} alt='' />
    </button>
  );
};

export default ToggleThemeButton;
