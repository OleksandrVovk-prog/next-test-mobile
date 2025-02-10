'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';

import type { IProduct } from '@/mockApi/interfaces/IProduct';

import useTranslation from '@/i18n/client';

export default function ProductPage({
  params: { lng, id },
}: {
  params: { lng: string, id: string },
}) {
  const { t } = useTranslation(lng, 'common');
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        const data: IProduct = await res.json() as IProduct;
        setProduct(data);
      } catch (error) {
        console.log('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct().catch((error) => console.log(error));
  }, [id]);

  if (loading) {
    return (
      <Loader lng={lng} />
    );
  }

  if (!product) {
    return <NotFound lng={lng} />;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mt-16 w-full max-w-4xl bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {product.name}
        </h1>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="rounded-lg shadow-md mx-auto mt-4"
        />
        <p className="text-gray-600 text-lg mt-4 text-center">
          {product.description}
        </p>
        <p className="text-2xl font-semibold text-blue-600 mt-4 text-center">
          {product.price}
        </p>
        <div className="text-center mt-6">
          <a
            href="/"
            className={`bg-gray-700 text-white px-6 py-3
            rounded-lg text-lg font-semibold shadow-md
            hover:bg-gray-800 transition-all duration-300`}
          >
            {t('back_to_home')}
          </a>
        </div>
      </div>
    </main>
  );
}
