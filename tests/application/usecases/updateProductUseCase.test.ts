import { UpdateProductUseCase } from '../../../src/application/use-cases/updateProductUseCase';
import { ProductEntity } from '../../../src/domain/entities/productEntity';
import { mockProductRepository } from '../../mocks/mockProductRepository';

describe('UpdateProductUseCase', () => {
  const updateProductUseCase = new UpdateProductUseCase(mockProductRepository);

  it('should update the product if it exists', async () => {
    const mockProduct: ProductEntity = {
      code: '123',
      product_name: 'Product 1',
      imported_t: new Date(),
      status: 'imported',
    };

    mockProductRepository.findByCode.mockResolvedValue(mockProduct);
    const updatedProduct = await updateProductUseCase.execute({
      code: '123',
      data: { product_name: 'Updated Product 1' },
    });

    expect(updatedProduct).toEqual({
      ...mockProduct,
      product_name: 'Updated Product 1',
    });
    expect(mockProductRepository.findByCode).toHaveBeenCalledWith('123');
  });

  it('should throw an error if the product does not exist', async () => {
    mockProductRepository.findByCode.mockResolvedValue(null);

    await expect(
      updateProductUseCase.execute({
        code: '999',
        data: { product_name: 'Updated Product' },
      })
    ).rejects.toThrow('Product not found');
  });
});
