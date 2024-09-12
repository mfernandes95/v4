export class ProductEntity {
  constructor(
    public code: string,
    public status: 'imported' | 'trash' | 'published',
    public imported_t: Date,
    public product_name: string,
    // public url: string,
    // public creator: string,
    // public created_t: Date,
    // public lastModifiedAt: Date,
    // public quantity: string,
    // public brands: string,
    // public categories: string,
    // public labels: string,
    // public cities: string,
    // public purchasePlaces: string,
    // public stores: string,
    // public ingredients_text: string,
    // public traces: string,
    // public servingSize: string,
    // public servingQuantity: number,
    // public nutriscoreScore: number,
    // public nutriscoreGrade: string,
    // public mainCategory: string,
    // public imageUrl: string
  ) {}
}
