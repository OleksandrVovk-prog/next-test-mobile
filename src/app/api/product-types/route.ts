import { NextResponse } from 'next/server';

import Products from '@/mockApi/products';

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '6', 10);

  if (Number.isNaN(page) || Number.isNaN(limit) || page < 1 || limit < 1) {
    return NextResponse.json({ error: 'Invalid pagination parameters' }, { status: 400 });
  }

  let filteredProducts = Products;

  // Filter by category unless "all" is specified
  if (category && category !== 'all') {
    filteredProducts = Products.filter((product) => product.category === category);
  }

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
  });
}
