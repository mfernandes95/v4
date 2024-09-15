import { ProductRepository } from '../../domain/repositories/productRepository';
import { IDeleteProductRequest } from '../../domain/types/productTypes';
import { CustomError } from '../errors/CustomError';

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IDeleteProductRequest): Promise<void> {
    const { code } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new CustomError('Product not found', 404);
    }

    await this.productRepository.delete(code);
  }
}
