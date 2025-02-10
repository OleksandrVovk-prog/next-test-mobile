'use client';

import useTranslation from '@/i18n/client';

export default function NotFound({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-red-600">
        ⚠️
        {t('not_found')}
      </h2>
      <a
        href="/"
        className={`mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg
          font-semibold shadow-md hover:bg-blue-700 transition-all duration-300`}
      >
        {t('back_to_home')}
      </a>
    </div>
  );
}
