'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'extensions-manager-theme';

type Theme = 'light' | 'dark';

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      root.setAttribute('data-theme', savedTheme);
      setMounted(true);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = prefersDark ? 'dark' : 'light';
    setTheme(initialTheme);
    root.setAttribute('data-theme', initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  const handleToggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

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
