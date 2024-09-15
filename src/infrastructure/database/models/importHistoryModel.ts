import mongoose, { Schema, Document, Model } from 'mongoose';

interface ImportHistoryDocument extends Document {
  date: Date;
  fileName: string;
  success: boolean;
  errorMessage: string;
}

const ImportHistorySchema: Schema<ImportHistoryDocument> = new Schema({
  date: { type: Date, required: true },
  fileName: { type: String, required: true },
  success: { type: Boolean, required: true },
  errorMessage: { type: String },
});

const ImportHistoryModel: Model<ImportHistoryDocument> =
  mongoose.model<ImportHistoryDocument>('ImportHistory', ImportHistorySchema);

export default ImportHistoryModel;
export type { ImportHistoryModel };
