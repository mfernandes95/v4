import { ProductRepository } from '../../domain/repositories/productRepository';
import { ProductEntity } from '../../domain/entities/productEntity';
import { IUpdateProductRequest } from '../../domain/types/productTypes';


export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IUpdateProductRequest): Promise<ProductEntity | null> {
    const { code, data } = request;
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new Error('Product not found');
    }

    const updatedProduct = { ...product, ...data };
    await this.productRepository.update(updatedProduct);

    return updatedProduct;
  }
}
