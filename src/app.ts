import express, { Application } from 'express';
import productRoutes from './presentation/routes/productRoutes';
import { connectToDatabase } from './infrastructure/database/config/mongoose';

const app: Application = express();

app.use(express.json());
app.use('/api', productRoutes);

connectToDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
