import { ProductEntity } from '../../domain/entities/productEntity';
import ProductModel, { ProductDocument } from '../database/models/productModel';
import { ProductRepository } from '../../domain/repositories/productRepository';

export class ProductRepositoryImpl implements ProductRepository {
  async findAll(
    offset: number,
    limit: number
  ): Promise<[ProductEntity[], number]> {
    const products = await ProductModel.find().skip(offset).limit(limit).exec();

    const total = await ProductModel.countDocuments().exec();

    const productEntities = products.map(
      (doc: ProductDocument) =>
        new ProductEntity(
          doc.code,
          doc.imported_t,
          doc.product_name,
          doc.url,
          doc.creator,
          doc.created_t,
          doc.last_modified_t,
          doc.quantity,
          doc.brands,
          doc.categories,
          doc.labels,
          doc.cities,
          doc.purchase_places,
          doc.stores,
          doc.ingredients_text,
          doc.traces,
          doc.serving_size,
          doc.serving_quantity,
          doc.nutriscore_score,
          doc.nutriscore_grade,
          doc.main_category,
          doc.image_url,
          doc.status
        )
    );

    return [productEntities, total];
  }

  async findByCode(code: string): Promise<ProductEntity | null> {
    const doc = await ProductModel.findOne({ code });
    if (!doc) return null;
    return new ProductEntity(
      doc.code,
      doc.imported_t,
      doc.product_name,
      doc.url,
      doc.creator,
      doc.created_t,
      doc.last_modified_t,
      doc.quantity,
      doc.brands,
      doc.categories,
      doc.labels,
      doc.cities,
      doc.purchase_places,
      doc.stores,
      doc.ingredients_text,
      doc.traces,
      doc.serving_size,
      doc.serving_quantity,
      doc.nutriscore_score,
      doc.nutriscore_grade,
      doc.main_category,
      doc.image_url,
      doc.status
    );
  }

  async save(product: ProductEntity): Promise<void> {
    const newProduct = new ProductModel(product);
    await newProduct.save();
  }

  async update(product: ProductEntity): Promise<void> {
    await ProductModel.updateOne({ code: product.code }, product);
  }

  async delete(code: string): Promise<void> {
    await ProductModel.updateOne({ code }, { status: 'trash' });
  }
}
