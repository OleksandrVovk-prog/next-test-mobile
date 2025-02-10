'use client';

import useTranslation from '@/i18n/client';

export default function HeroSection({ lng }:{ lng: string }) {
  const { t } = useTranslation(lng, 'common');

  return (
    <section className={`relative w-full h-[500px] flex flex-col items-center
      justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-10 shadow-lg`}
    >
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl font-extrabold leading-tight tracking-wide animate-fade-in">
          {t('hero_title')}
        </h1>
        <p className="text-lg mt-4 opacity-90">{t('hero_subtitle')}</p>
        <a
          href="/products"
          className={`mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-full
            text-lg font-semibold shadow-md hover:bg-gray-100 transition-all duration-300`}
        >
          {t('explore_products')}
        </a>
      </div>
    </section>
  );
}
