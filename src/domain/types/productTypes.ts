import { ProductEntity } from '../entities/productEntity';

// Request Interfaces

export interface IListProductsRequest {
  page: number;
  limit: number;
}

export interface IGetProductRequest {
  code: string;
}

export interface IDeleteProductRequest {
  code: string;
}

export interface IUpdateProductRequest {
  code: string;
  data: Partial<ProductEntity>;
}

// Response Interfaces

export interface IListProductsResponse {
  products: ProductEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
