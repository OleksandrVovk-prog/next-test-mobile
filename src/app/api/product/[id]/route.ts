import { NextResponse } from 'next/server';

import Products from '@/mockApi/products';

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const productId = parseInt(params.id, 10);

  const product = Products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}
