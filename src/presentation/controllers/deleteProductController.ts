import { Request, Response, NextFunction } from 'express';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';
import { DeleteProductUseCase } from '../../application/use-cases/deleteProductUseCase';

const productRepository = new ProductRepositoryImpl();
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

export class DeleteProductController {
  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.params;
      await deleteProductUseCase.execute({ code });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
