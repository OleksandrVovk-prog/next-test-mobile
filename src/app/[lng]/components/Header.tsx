'use client';

import ToggleLanguage from './ToggleLanguage';

import useTranslation from '@/i18n/client';

export default function Header({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'common');

  return (
    <header className={`top-0 left-0 w-full bg-white shadow-md py-4 px-6
      flex items-center justify-between md:flex-row flex-col text-center md:text-left z-50`}
    >
      {/* Logo and Store Name */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl">🛍️</span>
        <a href="/" className="text-2xl font-bold text-gray-800 whitespace-nowrap">
          {t('store_name')}
        </a>
      </div>

      {/* Welcome Message */}
      <p className="text-sm md:text-lg font-medium text-gray-700 mt-2 md:mt-0">
        {t('welcome')}
      </p>

      {/* Language Switcher */}
      <div className="mt-2 md:mt-0">
        <ToggleLanguage />
      </div>
    </header>
  );
}
