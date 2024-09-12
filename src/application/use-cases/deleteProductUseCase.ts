import { ProductRepository } from '../../domain/repositories/productRepository';

interface IDeleteProductRequest {
  code: string;
}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IDeleteProductRequest): Promise<void> {
    const { code } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new Error('Product not found');
    }

    await this.productRepository.delete(code);
  }
}
