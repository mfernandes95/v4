import { ImportHistoryEntity } from '../entities/importHistoryEntity';

export interface ImportHistoryRepository {
  save(history: ImportHistoryEntity): Promise<void>;
}
