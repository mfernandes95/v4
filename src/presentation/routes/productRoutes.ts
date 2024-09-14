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

router.get('/products', (req, res) => listProductController.listProducts(req, res));
router.get('/products/:code', (req, res) => getProductController.getProduct(req, res));
router.delete('/products/:code', (req, res) => deleteProductController.deleteProduct(req, res));
router.put('/products/:code', (req, res) => updateProductController.updateProduct(req, res));

export default router;