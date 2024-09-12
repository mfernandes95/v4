import { Router } from 'express';
import { ListProductsController } from '../controllers/listProductsController';
import { CreateProductController } from '../controllers/createProductController';

const router = Router();

const listProductController = new ListProductsController();
const createProductController = new CreateProductController();

router.get('/products', (req, res) => listProductController.listProducts(req, res));
router.post('/products', (req, res) => createProductController.createProduct(req, res));

export default router;