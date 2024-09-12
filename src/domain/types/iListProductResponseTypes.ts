import { ProductEntity } from '../../domain/entities/productEntity';

export interface IListProductsRequest {
  page: number;
  limit: number;
}

export interface IListProductsResponse {
  products: ProductEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


