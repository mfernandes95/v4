import { ProductRepository } from '../../domain/repositories/productRepository';
import { IListProductsRequest, IListProductsResponse } from '../../domain/types/productTypes';

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IListProductsRequest): Promise<IListProductsResponse> {
    const { page = 1, limit = 10 } = request;

    if (page < 1) {
      throw new Error('Page number must be greater than 0');
    }
    if (limit < 1) {
      throw new Error('Limit must be greater than 0');
    }

    const offset = (page - 1) * limit;
    const [products, total] = await this.productRepository.findAll(offset, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      products,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
