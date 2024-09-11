import { GetProducts } from '../../../src/application/use-cases/GetProducts';

describe('GetProducts Use Case', () => {
  it('should get products successfully', () => {
    const getProducts = new GetProducts();
    const products = getProducts.execute();
    expect(products).toEqual({ ok: true });
  });
});
