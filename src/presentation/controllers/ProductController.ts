
import { Request, Response } from 'express';
import { GetProducts } from '../../application/use-cases/GetProducts';

export class ProductController {
  private getProducts: GetProducts;

  constructor() {
    this.getProducts = new GetProducts();
  }

  public get(req: Request, res: Response): Response {
    const product = this.getProducts.execute();
    return res.json(product);
  }
}
