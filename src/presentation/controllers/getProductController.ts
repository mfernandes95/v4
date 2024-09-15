import { Request, Response, NextFunction } from 'express';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';
import { GetProductUseCase } from '../../application/use-cases/getProductUseCase';

const productRepository = new ProductRepositoryImpl();
const getProductUseCase = new GetProductUseCase(productRepository);

export class GetProductController {
  async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.params;
      const product = await getProductUseCase.execute({ code });
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
