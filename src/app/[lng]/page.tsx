'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import HeroSection from './components/HeroSection';

import type { IProduct } from '@/mockApi/interfaces/IProduct';
import type { IProductsResponse } from '@/mockApi/interfaces/IProductsResponse';

import useTranslation from '@/i18n/client';

const categories = [
  { id: 'smartwatch', name: 'Smartwatches' },
  { id: 'laptop', name: 'Laptops' },
  { id: 'gaming', name: 'Gaming Consoles' },
];

export default function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = useTranslation(lng, 'common');
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('smartwatch');

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const res = await fetch(`/api/product-types?category=${selectedCategory}`);
        const data = await res.json() as IProductsResponse;
        setProducts(data.products);
      } catch (error) {
        console.log('Failed to fetch products:', error);
      }
    };

    fetchProducts().catch((error) => console.log(error));
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <HeroSection lng={lng} />

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            type="button"
            key={category.id}
            className={`px-5 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <section className="mt-10 w-full max-w-5xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">{t('featured_products')}</h2>
        <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/${lng}/product/${product.id}`} passHref>
              <div
                className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105"
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
    </main>
  );
}
