import { ImportHistoryEntity } from '../../domain/entities/importHistoryEntity';
import { ImportHistoryRepository } from '../../domain/repositories/importHistoryRepository';
import importHistoryModel from '../database/models/importHistoryModel';


export class ImportHistoryRepositoryImpl implements ImportHistoryRepository {
  async save(history: ImportHistoryEntity): Promise<void> {
   try {
    const importHistory = new importHistoryModel(history);
    await importHistory.save();
   } catch (error) {
    console.error('Error saving import history:', error);
   }
  }
}
