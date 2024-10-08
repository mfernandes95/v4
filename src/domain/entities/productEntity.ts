export class ProductEntity {
  constructor(
    public code: string,
    public imported_t: Date,
    public product_name: string,
    public url: string,
    public creator: string,
    public created_t: number,
    public last_modified_t: number,
    public quantity: string,
    public brands: string,
    public categories: string,
    public labels: string,
    public cities: string,
    public purchase_places: string,
    public stores: string,
    public ingredients_text: string,
    public traces: string,
    public serving_size: string,
    public serving_quantity: number,
    public nutriscore_score: number,
    public nutriscore_grade: string,
    public main_category: string,
    public image_url: string,
    public status?: 'imported' | 'trash' | 'published'
  ) {}
}
