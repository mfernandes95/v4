import { GetProductUseCase } from '../../../src/application/use-cases/getProductUseCase';
import { ProductEntity } from '../../../src/domain/entities/productEntity';
import { mockProductRepository } from '../../mocks/mockProductRepository';

describe('GetProductUseCase', () => {
  const getProductUseCase = new GetProductUseCase(mockProductRepository);

  it('should return the product if it exists', async () => {
    const mockProduct: ProductEntity = {
      code: '123',
      product_name: 'Product 1',
      imported_t: new Date(),
      status: 'published',
    };

    mockProductRepository.findByCode.mockResolvedValue(mockProduct);

    const product = await getProductUseCase.execute({ code: '123' });

    expect(product).toEqual(mockProduct);
    expect(mockProductRepository.findByCode).toHaveBeenCalledWith('123');
  });

  it('should throw an error if the product does not exist', async () => {
    mockProductRepository.findByCode.mockResolvedValue(null);

    await expect(getProductUseCase.execute({ code: '999' })).rejects.toThrow('Product not found');
  });
});
