import mongoose, { Schema, Document, Model } from 'mongoose';

interface ProductDocument extends Document {
  code: string;
  imported_t: Date;
  status: 'imported' | 'trash' | 'published';
  product_name: string;
  url: string;
  creator: string;
  created_t: number;
  last_modified_t: number;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: number;
  nutriscore_score: number;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}

const ProductSchema: Schema<ProductDocument> = new Schema({
  code: { type: String, required: true, unique: true },
  imported_t: { type: Date, required: true },
  status: { type: String, enum: ['imported', 'trash', 'published'], default: 'imported' },
  product_name: { type: String },
  url: { type: String },
  creator: { type: String },
  created_t: { type: Number },
  last_modified_t: { type: Number },
  quantity: { type: String },
  brands: { type: String },
  categories: { type: String },
  labels: { type: String },
  cities: { type: String },
  purchase_places: { type: String },
  stores: { type: String },
  ingredients_text: { type: String },
  traces: { type: String },
  serving_size: { type: String },
  serving_quantity: { type: Number },
  nutriscore_score: { type: Number },
  nutriscore_grade: { type: String },
  main_category: { type: String },
  image_url: { type: String }
});

const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
export type { ProductDocument };
