'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { languages } from '../../../i18n/settings';

import type { ReactElement } from 'react';

function ToggleLanguage(): ReactElement {
  const { lng } = useParams();

  return (
    <div className="flex items-center space-x-4">
      {languages.map((language) => (
        <Link
          href={`/${language}`}
          key={language}
          className={`px-4 py-2 rounded-md ${
            lng === language ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          {language}
        </Link>
      ))}
      &nbsp;
    </div>
  );
}

export default ToggleLanguage;
