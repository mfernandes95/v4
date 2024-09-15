import { Request, Response, NextFunction } from 'express';
import { UpdateProductUseCase } from '../../application/use-cases/updateProductUseCase';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/productRepositoryImpl';

const productRepository = new ProductRepositoryImpl();
const updateProductUseCase = new UpdateProductUseCase(productRepository);

export class UpdateProductController {
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.params;
      const data = req.body;
      const updatedProduct = await updateProductUseCase.execute({ code, data });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
}
