'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { WEEKS } from '@/types';
import LocaleSwitcher from './LocaleSwitcher';

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav className="bg-[#1B3A5C] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold text-[#D4A843]">{t('brand')}</span>
            <span className="hidden sm:block text-sm text-gray-300">
              {t('subtitle')}
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {WEEKS.map((week) => {
              const href = `/week/${String(week.weekNumber).padStart(2, '0')}`;
              const isActive = pathname?.startsWith(href);
              return (
                <Link
                  key={week.weekNumber}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/20 text-[#D4A843]'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  W{week.weekNumber}
                </Link>
              );
            })}
            <span className="w-px h-5 bg-gray-600 mx-1" />
            <Link
              href="/tutor"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname?.startsWith('/tutor')
                  ? 'bg-white/20 text-[#D4A843]'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {t('aiTutor')}
            </Link>
            <span className="w-px h-5 bg-gray-600 mx-1" />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
