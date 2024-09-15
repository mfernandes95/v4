import express, { Application } from 'express';
import mongoose from 'mongoose';
import productRoutes from './presentation/routes/productRoutes';
import { connectToDatabase } from './infrastructure/database/config/mongoose';
import {
  startCrons,
  getLastCronRun,
} from './infrastructure/cron/importProductsCron';
import globalErrorHandler from './errors/globalErrorHandler';

import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

app.use(express.json());
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
