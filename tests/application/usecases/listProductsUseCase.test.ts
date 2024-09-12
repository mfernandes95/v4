import { ListProductsUseCase } from '../../../src/application/use-cases/listProductsUseCase';
import { ProductEntity } from '../../../src/domain/entities/productEntity';
import { mockProductRepository } from '../../mocks/mockProductRepository';

describe('ListProductsUseCase', () => {
  const listProductsUseCase = new ListProductsUseCase(mockProductRepository);

  it('should return paginated products', async () => {
    const mockProducts: ProductEntity[] = [
      { code: '123', product_name: 'Product 1', imported_t: new Date(), status: 'published' },
      { code: '456', product_name: 'Product 2', imported_t: new Date(), status: 'imported' },
    ];
    const totalProducts = 20;
    mockProductRepository.findAll.mockResolvedValue([mockProducts, totalProducts]);
    const response = await listProductsUseCase.execute({ page: 1, limit: 10 });

    expect(response.products).toEqual(mockProducts);
    expect(response.total).toBe(totalProducts);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.totalPages).toBe(Math.ceil(totalProducts / 10));
  });

  it('should throw an error if page or limit is invalid', async () => {
    await expect(listProductsUseCase.execute({ page: -1, limit: 10 })).rejects.toThrow(
      'Page number must be greater than 0'
    );

    await expect(listProductsUseCase.execute({ page: 1, limit: 0 })).rejects.toThrow(
      'Limit must be greater than 0'
    );
  });
});
