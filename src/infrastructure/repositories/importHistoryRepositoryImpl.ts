import { ImportHistoryEntity } from '../../domain/entities/importHistoryEntity';
import { ImportHistoryRepository } from '../../domain/repositories/importHistoryRepository';
import importHistoryModel from '../database/models/importHistoryModel';

export class ImportHistoryRepositoryImpl implements ImportHistoryRepository {
  async save(history: ImportHistoryEntity): Promise<void> {
    const importHistory = new importHistoryModel(history);
    await importHistory.save();
  }
}
