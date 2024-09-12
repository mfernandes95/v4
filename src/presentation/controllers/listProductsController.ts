import { Request, Response } from 'express';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';
import { ListProductsUseCase } from '../../application/use-cases/listProductsUseCase';

const productRepository = new ProductRepositoryImpl();
const listProductsUseCase = new ListProductsUseCase(productRepository);

export class ListProductsController {
  async listProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { products, total } = await listProductsUseCase.execute({page, limit});

      res.status(200).json({
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to list products' });
    }
  }
}
