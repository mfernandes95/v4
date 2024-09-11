import express from 'express';
import { ProductController } from './presentation/controllers/ProductController';

const app = express();
const productController = new ProductController();

app.use(express.json());

app.get('/', (req, res) => productController.get(req, res));

app.listen(3000, () => console.log('Server running on port 3000'));
