import axios from 'axios';
import zlib from 'zlib';
import { ProductEntity } from '../../domain/entities/productEntity';
import { ImportHistoryEntity } from '../../domain/entities/importHistoryEntity';
import { ImportHistoryRepository } from '../../domain/repositories/importHistoryRepository';
import { ProductRepository } from '../../domain/repositories/productRepository';
import path from 'path';
import fs, { createReadStream } from 'fs';
import readline from 'readline';

export class ImportProductService {
  private productRepository: ProductRepository;
  private historyRepository: ImportHistoryRepository;

  constructor(
    productRepository: ProductRepository,
    historyRepository: ImportHistoryRepository
  ) {
    this.productRepository = productRepository;
    this.historyRepository = historyRepository;
  }

  async fetchFile(
    url: string,
    responseType: 'json' | 'stream' = 'json'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
      const response = await axios.get(url, { responseType });
      return response.data;
  }

  private async extractFile(
    fileUrl: string,
    outputFilePath: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(outputFilePath);
      const gunzip = zlib.createGunzip();

      this.fetchFile(fileUrl, 'stream')
        .then((zippedData) => {
          zippedData.pipe(gunzip).pipe(writeStream);

          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        })
        .catch(reject);
    });
  }

  private async processFile(filePath: string): Promise<void> {
    const readStream = createReadStream(filePath, { encoding: 'utf-8' });
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    let processedItems = 0;

    for await (const line of rl) {
      if (processedItems >= 100) break;

      try {
        const data = JSON.parse(line);

        const newProduct: ProductEntity = {
          code: data.code.replace(/"/g, ''),
          product_name: data.product_name,
          imported_t: new Date(),
          url: data.url,
          creator: data.creator,
          created_t: data.created_t,
          last_modified_t: data.last_modified_t,
          quantity: data.quantity,
          brands: data.brands,
          categories: data.categories,
          labels: data.labels,
          cities: data.cities,
          purchase_places: data.purchase_places,
          stores: data.stores,
          ingredients_text: data.ingredients_text,
          traces: data.traces,
          serving_size: data.serving_size,
          serving_quantity: data.serving_quantity,
          nutriscore_score: data.nutriscore_score,
          nutriscore_grade: data.nutriscore_grade,
          main_category: data.main_category,
          image_url: data.image_url,
        };

        await this.productRepository.save(newProduct);
        processedItems++;
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    }
  }

  private async handleImportHistory(
    file: string,
    success: boolean,
    errorMessage?: string
  ): Promise<void> {
    await this.historyRepository.save(
      new ImportHistoryEntity(new Date(), file, success, errorMessage)
    );
  }

  public async importData(): Promise<void> {
    const indexUrl = 'https://challenges.coode.sh/food/data/json/index.txt';

      const indexResponse = await this.fetchFile(indexUrl);
      const files = indexResponse.split('\n').filter((file: string) => file);

      for (const file of files) {
        const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
        const baseFileName = path.basename(file, '.gz');
        const outputFilePath = path.join(__dirname, `${baseFileName}`);

        try {
          await this.extractFile(fileUrl, outputFilePath);
          await this.processFile(outputFilePath);
          fs.unlinkSync(outputFilePath);
          await this.handleImportHistory(file, true);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          await this.handleImportHistory(file, false, errorMessage);
        }
      }
  }
}
