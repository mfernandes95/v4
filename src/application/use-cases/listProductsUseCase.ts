import { ProductRepository } from '../../domain/repositories/productRepository';
import {
  IListProductsRequest,
  IListProductsResponse,
} from '../../domain/types/productTypes';
import { CustomError } from '../errors/CustomError';

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: IListProductsRequest): Promise<IListProductsResponse> {
    const { page = 1, limit = 10 } = request;

    if (page < 1) {
      throw new CustomError('Page number must be greater than 0', 400);
    }
    if (limit < 1) {
      throw new CustomError('Limit must be greater than 0', 400);
    }

    const offset = (page - 1) * limit;
    const [products, total] = await this.productRepository.findAll(
      offset,
      limit
    );
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
