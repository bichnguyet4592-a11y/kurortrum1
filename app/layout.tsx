import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QuickSelect from './QuickSelect';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Курортрум — посуточная аренда жилья на КМВ',
  description: 'Квартиры, дома и апартаменты в Кисловодске, Пятигорске, Ессентуках и Железноводске — напрямую от хозяев. Без комиссии.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <QuickSelect />
      </body>
    </html>
  );
}
