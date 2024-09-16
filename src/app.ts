import express, { Application } from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './presentation/routes/productRoutes';
import { connectToDatabase } from './infrastructure/database/config/mongoose';
import {
  startCrons,
  getLastCronRun,
} from './infrastructure/cron/importProductsCron';
import globalErrorHandler from './errors/globalErrorHandler';
import apiKeyMiddleware from './middleware/apiKeyMiddleware';

dotenv.config();

const app: Application = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(apiKeyMiddleware)
app.use(productRoutes);

connectToDatabase();

startCrons();

// API Details
app.get('/', async (req, res) => {
  res.status(200).json({
    status: 'API is running',
    database:
      mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    lastCronRun: getLastCronRun() || 'Not yet executed',
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});