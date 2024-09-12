import { ProductRepository } from '../../domain/repositories/productRepository';

interface IGetProductRequest {
  code: string;
}

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IGetProductRequest): Promise<any | null> {
    const { code } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
