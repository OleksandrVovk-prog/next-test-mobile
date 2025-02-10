'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Loader from '../components/Loader';

import type { IProduct } from '@/mockApi/interfaces/IProduct';
import type { IProductsResponse } from '../../../mockApi/interfaces/IProductsResponse';

import useTranslation from '@/i18n/client';

const ITEMS_PER_PAGE = 6; // Number of products per page

export default function ProductsPage({ params: { lng } }: { params: { lng: string } }) {
  const { t } = useTranslation(lng, 'common');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product-types?category=all&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);
        const data = await res.json() as IProductsResponse;

        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts().catch((error) => console.error(error));
  }, [currentPage]);

  if (loading) {
    return (
      <Loader lng={lng} />
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold text-gray-800">{t('all_products')}</h1>

      {/* Product Grid */}
      <section className="mt-6 w-full max-w-6xl text-center">
        <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/${lng}/product/${product.id}`} passHref>
              <div className={`bg-white p-6 rounded-lg shadow-md transform transition-all
                duration-300 hover:scale-105 cursor-pointer`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={250}
                  className="rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold text-blue-600 mt-2">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="mt-8 flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all ${
            currentPage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={currentPage === 1}
        >
          {t('prev_page')}
        </button>

        <span className="text-lg font-semibold">
          {t('page')}
          {' '}
          {currentPage}
          {' '}
          /
          {' '}
          {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className={`px-4 py-2 rounded-md text-lg font-semibold transition-all ${
            currentPage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={currentPage === totalPages}
        >
          {t('next_page')}
        </button>
      </div>
    </main>
  );
}
