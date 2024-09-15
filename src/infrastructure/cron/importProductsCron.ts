import cron from 'node-cron';
import { ImportProductService } from '../../application/services/importService';
import { ImportHistoryRepositoryImpl } from '../repositories/importHistoryRepositoryImpl';
import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import { sendAlertEmail } from '../../application/services/sendAlertEmail';

let lastCronRun: Date | null = null;

const historyRepository = new ImportHistoryRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const importService = new ImportProductService(
  productRepository,
  historyRepository
);

const task = cron.schedule('0 0 * * *', async () => {
  console.log('Starting daily import...');
  try {
    await importService.importData();
    lastCronRun = new Date();
    await sendAlertEmail();
    console.log('Daily import completed successfully.');
  } catch (error) {
    console.error('Daily import failed:', error);
  }
});

const startCrons = () => {
  task.start();
};

const getLastCronRun = () => lastCronRun;

export { startCrons, getLastCronRun };
