import { ProductRepository } from '../../domain/repositories/productRepository';
import { ProductEntity } from '../../domain/entities/productEntity';
import { IUpdateProductRequest } from '../../domain/types/productTypes';
import { CustomError } from '../errors/CustomError';

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IUpdateProductRequest): Promise<ProductEntity | null> {
    const { code, data } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    const updatedProduct = { ...product, ...data };
    await this.productRepository.update(updatedProduct);

    return updatedProduct;
  }
}
