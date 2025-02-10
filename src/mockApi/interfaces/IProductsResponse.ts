import type { IProduct } from './IProduct';

export interface IProductsResponse {
  products: IProduct[],
  total: number,
  page: number,
  totalPages: number,
}
