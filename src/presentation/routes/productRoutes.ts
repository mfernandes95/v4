import { Router } from 'express';
import { ListProductsController } from '../controllers/listProductsController';
import { GetProductController } from '../controllers/getProductController';
import { DeleteProductController } from '../controllers/deleteProductController';
import { UpdateProductController } from '../controllers/updateProductController';

const router = Router();

const listProductController = new ListProductsController();
const getProductController = new GetProductController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

router.get('/products', (req, res, next) =>
  listProductController.listProducts(req, res, next)
);
router.get('/products/:code', (req, res, next) =>
  getProductController.getProduct(req, res, next)
);
router.delete('/products/:code', (req, res, next) =>
  deleteProductController.deleteProduct(req, res, next)
);
router.put('/products/:code', (req, res, next) =>
  updateProductController.updateProduct(req, res, next)
);

export default router;
