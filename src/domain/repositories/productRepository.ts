import { ProductEntity } from '../entities/productEntity';

export interface ProductRepository {
  findByCode(code: string): Promise<ProductEntity | null>;
  findAll(page: number, limit: number): Promise<any>;
  update(product: ProductEntity): Promise<void>;
  delete(code: string): Promise<void>;
  save(product: ProductEntity): Promise<any>;
}
