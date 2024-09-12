export interface ProductBase {
    code: number;
    status: 'draft' | 'published' | 'trash';
    imported_t: Date;
    product_name: string;
    // url: string;
    // creator: string;
    // created_t: number;
    // last_modified_t: number;
    // quantity: string;
    // brands: string;
    // categories: string;
    // labels: string;
    // cities: string;
    // purchase_places: string;
    // stores: string;
    // ingredients_text: string;
    // traces: string;
    // serving_size: string;
    // serving_quantity: number;
    // nutriscore_score: number;
    // nutriscore_grade: string;
    // main_category: string;
    // image_url: string;
  }
  
  // export type Product = ProductBase;
  
  // export type CreateProductRequest = ProductBase;
  