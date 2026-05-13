import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans({
  variable: '--font-notosans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Browser Extensions Manager',
  description: 'Manage and filter browser extensions with a clean dashboard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${notoSans.variable} min-h-screen bg-linear-(--light-gradient) px-4 pb-16 pt-6 antialiased dark:bg-linear-(--dark-gradient)`}
      >
        <div className='mx-auto w-full max-w-[72rem]'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
