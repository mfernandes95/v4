import { ProductRepository } from '../../domain/repositories/productRepository';
import { ProductEntity } from '../../domain/entities/productEntity';
import { IGetProductRequest } from '../../domain/types/productTypes';
import { CustomError } from '../errors/CustomError';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IGetProductRequest): Promise<ProductEntity> {
    const { code } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    return product;
  }
}
