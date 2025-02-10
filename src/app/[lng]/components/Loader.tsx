'use client';

import useTranslation from '@/i18n/client';

export default function Loader({ lng }:{ lng: string }) {
  const { t } = useTranslation(lng, 'common');
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 text-lg">{t('loading')}</p>
      </div>
    </div>
  );
}
