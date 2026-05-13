'use client';

import rawExtensions from '@/data.json';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

type Filter = 'all' | 'active' | 'inactive';

type ExtensionItem = {
  id: number;
  logo: string;
  name: string;
  description: string;
  isActive: boolean;
};

type RawExtensionItem = Omit<ExtensionItem, 'id'> & {
  id?: number;
};

const STORAGE_KEY = 'extensions-manager-state-v3';

const normalizeLogoPath = (logo: string) => {
  if (logo.startsWith('/assets/')) return logo;
  if (logo.startsWith('./assets/images/')) return logo.replace('./assets/images/', '/assets/');
  if (logo.startsWith('./assets/')) return logo.replace('./', '/');
  if (logo.startsWith('assets/')) return `/${logo}`;
  return logo;
};

const defaults = (rawExtensions as RawExtensionItem[]).map((extension, index) => ({
  id: extension.id ?? index + 1,
  logo: normalizeLogoPath(extension.logo),
  name: extension.name,
  description: extension.description,
  isActive: extension.isActive,
}));

const getDefaultExtensions = () => defaults.map((extension) => ({ ...extension }));

const sanitizeStoredExtensions = (value: unknown): ExtensionItem[] => {
  if (!Array.isArray(value)) return [];

  const byId = new Map(defaults.map((item) => [item.id, item]));
  const byName = new Map(defaults.map((item) => [item.name, item]));

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;

      const maybeItem = item as Partial<ExtensionItem>;
      const fallback =
        (typeof maybeItem.id === 'number' ? byId.get(maybeItem.id) : undefined) ||
        (typeof maybeItem.name === 'string' ? byName.get(maybeItem.name) : undefined);

      if (!fallback) return null;

      return {
        id: fallback.id,
        logo: normalizeLogoPath(typeof maybeItem.logo === 'string' ? maybeItem.logo : fallback.logo),
        name: typeof maybeItem.name === 'string' ? maybeItem.name : fallback.name,
        description:
          typeof maybeItem.description === 'string' ? maybeItem.description : fallback.description,
        isActive: typeof maybeItem.isActive === 'boolean' ? maybeItem.isActive : fallback.isActive,
      };
    })
    .filter((item): item is ExtensionItem => item !== null);
};

export default function Home() {
  const [extensions, setExtensions] = useState<ExtensionItem[]>(getDefaultExtensions());
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as unknown;
      const sanitized = sanitizeStoredExtensions(parsed);
      if (sanitized.length > 0) {
        setExtensions(sanitized);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(extensions));
  }, [extensions]);

  const visibleExtensions = useMemo(() => {
    return extensions.filter((extension) => {
      const filterMatch =
        filter === 'all' ||
        (filter === 'active' && extension.isActive) ||
        (filter === 'inactive' && !extension.isActive);

      const queryMatch =
        extension.name.toLowerCase().includes(query.toLowerCase()) ||
        extension.description.toLowerCase().includes(query.toLowerCase());

      return filterMatch && queryMatch;
    });
  }, [extensions, filter, query]);

  const activeCount = useMemo(() => extensions.filter((item) => item.isActive).length, [extensions]);

  const toggleExtension = (id: number) => {
    setExtensions((current) =>
      current.map((extension) =>
        extension.id === id ? { ...extension, isActive: !extension.isActive } : extension
      )
    );
  };

  const removeExtension = (id: number) => {
    setExtensions((current) => current.filter((extension) => extension.id !== id));
  };

  const restoreDefaults = () => {
    setExtensions(getDefaultExtensions());
    setFilter('all');
    setQuery('');
  };

  return (
    <main className='space-y-6'>
      <section className='rounded-24 border border-neutral-200 bg-neutral-0/90 p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/90'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.18em] text-neutral-600 dark:text-neutral-300'>
              Browser Extensions Manager
            </p>
            <h2 className='mt-2 text-preset-1 text-neutral-900 dark:text-neutral-0'>My Extensions</h2>
            <p className='mt-1 text-preset-5 text-neutral-600 dark:text-neutral-300'>
              {activeCount} active of {extensions.length} installed
            </p>
          </div>

          <button
            type='button'
            onClick={restoreDefaults}
            className='h-[42px] rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-neutral-0 dark:border-neutral-600 dark:text-neutral-0 dark:hover:bg-neutral-700 dark:focus:ring-red-400 dark:focus:ring-offset-neutral-900'
          >
            Restore defaults
          </button>
        </div>

        <div className='mt-5 flex flex-col gap-3 lg:flex-row lg:items-center'>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search by name or description...'
            className='h-[44px] w-full rounded-12 border border-neutral-300 bg-neutral-0 px-4 text-sm text-neutral-900 outline-none placeholder:text-neutral-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-0 dark:placeholder:text-neutral-400 dark:focus:border-red-400 dark:focus:ring-red-400/20'
          />

          <div className='inline-flex rounded-full border border-neutral-300 p-1 dark:border-neutral-600'>
            {([
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ] as const).map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => setFilter(option.value)}
                className={`h-9 rounded-full px-4 text-sm font-medium transition ${
                  filter === option.value
                    ? 'bg-red-700 text-neutral-0 dark:bg-red-400 dark:text-neutral-900'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        {visibleExtensions.length === 0 ? (
          <div className='rounded-24 border border-dashed border-neutral-300 bg-neutral-0/70 p-10 text-center dark:border-neutral-600 dark:bg-neutral-800/60'>
            <p className='text-preset-2 text-neutral-900 dark:text-neutral-0'>No extensions found</p>
            <p className='mt-2 text-preset-5 text-neutral-600 dark:text-neutral-300'>
              Try another filter or reset the list.
            </p>
          </div>
        ) : (
          <ul className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {visibleExtensions.map((extension) => (
              <li
                key={extension.id}
                className='flex h-full min-h-[215px] flex-col justify-between rounded-20 border border-neutral-200 bg-neutral-0 p-5 shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none'
              >
                <div className='grid grid-cols-[56px_1fr] gap-4'>
                  <Image src={extension.logo} width={56} height={56} alt={`${extension.name} logo`} />
                  <div>
                    <h3 className='text-preset-2 text-neutral-900 dark:text-neutral-0'>{extension.name}</h3>
                    <p className='mt-1 text-preset-5 text-neutral-600 dark:text-neutral-300'>
                      {extension.description}
                    </p>
                  </div>
                </div>

                <div className='mt-5 flex items-center justify-between'>
                  <button
                    type='button'
                    onClick={() => removeExtension(extension.id)}
                    className='h-[36px] rounded-full border border-neutral-300 px-4 text-sm font-semibold text-neutral-900 transition hover:border-red-700 hover:bg-red-700 hover:text-neutral-0 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-neutral-0 dark:border-neutral-600 dark:text-neutral-0 dark:hover:border-red-400 dark:hover:bg-red-400 dark:hover:text-neutral-900 dark:focus:ring-red-400 dark:focus:ring-offset-neutral-900'
                  >
                    Remove
                  </button>

                  <button
                    type='button'
                    onClick={() => toggleExtension(extension.id)}
                    aria-label={`Toggle ${extension.name}`}
                    className={`relative h-6 w-11 rounded-full transition ${
                      extension.isActive ? 'bg-red-700 dark:bg-red-400' : 'bg-neutral-300 dark:bg-neutral-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-neutral-0 transition ${
                        extension.isActive ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
