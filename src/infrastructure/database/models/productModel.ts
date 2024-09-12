import mongoose, { Schema, Document, Model } from 'mongoose';

interface ProductDocument extends Document {
  code: string;
  imported_t: Date;
  status: 'imported' | 'trash' | 'published';
  product_name: string;
  // url: string;
  // creator: string;
  // created_t: Date;
  // lastModifiedAt: Date;
  // quantity: string;
  // brands: string;
  // categories: string;
  // labels: string;
  // cities: string;
  // purchasePlaces: string;
  // stores: string;
  // ingredients_text: string;
  // traces: string;
  // servingSize: string;
  // servingQuantity: number;
  // nutriscoreScore: number;
  // nutriscoreGrade: string;
  // mainCategory: string;
  // imageUrl: string;
}

const ProductSchema: Schema<ProductDocument> = new Schema({
  code: { type: String, required: true, unique: true },
  imported_t: { type: Date, required: true },
  status: { type: String, enum: ['imported', 'trash', 'published'], default: 'imported' },
  product_name: { type: String },
  // url: { type: String },
  // creator: { type: String },
  // created_t: { type: Date },
  // lastModifiedAt: { type: Date },
  // quantity: { type: String },
  // brands: { type: String },
  // categories: { type: String },
  // labels: { type: String },
  // cities: { type: String },
  // purchasePlaces: { type: String },
  // stores: { type: String },
  // ingredients_text: { type: String },
  // traces: { type: String },
  // servingSize: { type: String },
  // servingQuantity: { type: Number },
  // nutriscoreScore: { type: Number },
  // nutriscoreGrade: { type: String },
  // mainCategory: { type: String },
  // imageUrl: { type: String }
});

const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
export type { ProductDocument };
