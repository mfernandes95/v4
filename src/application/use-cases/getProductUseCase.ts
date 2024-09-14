import { ProductRepository } from '../../domain/repositories/productRepository';
import { ProductEntity } from '../../domain/entities/productEntity';
import { IGetProductRequest } from '../../domain/types/productTypes';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IGetProductRequest): Promise<ProductEntity> {
    const { code } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
