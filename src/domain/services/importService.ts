import axios from 'axios';
import zlib from 'zlib';
import { ProductEntity } from '../entities/productEntity';
import { ImportHistoryEntity } from '../entities/importHistoryEntity';
import { ImportHistoryRepository } from '../repositories/importHistoryRepository';
import { ProductRepository } from '../repositories/productRepository';
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

  async fetchFile(url: string, responseType: 'json' | 'stream' = 'json'): Promise<any> {
    const response = await axios.get(url, { responseType });
    return response.data;
  }

  async importData(): Promise<void> {
    const indexUrl = 'https://challenges.coode.sh/food/data/json/index.txt';
    const indexResponse = await this.fetchFile(indexUrl);
    const files = indexResponse.split('\n').filter((file: string) => file);

    for (const file of files) {
      const fileUrl = `https://challenges.coode.sh/food/data/json/${file}`;
      const baseFileName = path.basename(file, '.gz');
      const outputFilePath = path.join(__dirname, `${baseFileName}`);
      const writeStream = fs.createWriteStream(outputFilePath);
      const gunzip = zlib.createGunzip();
      
      const zippedData = await this.fetchFile(fileUrl, 'stream');

      try {
        zippedData.pipe(gunzip).pipe(writeStream);

        await new Promise<void>((resolve, reject) => {
          writeStream.on('finish', resolve);
          writeStream.on('error', reject);
        });

        const readStream = createReadStream(outputFilePath, { encoding: 'utf-8' });
        const rl = readline.createInterface({
          input: readStream,
          crlfDelay: Infinity,
        });

        let processedItems = 0;
        for await (const line of rl) {
          if (processedItems >= 2) break;

          try {
            const data = JSON.parse(line);

            const newProduct: ProductEntity = {
              code: data.code,
              product_name: data.product_name,
              imported_t: new Date(),
            };
            await this.productRepository.save(newProduct);
            processedItems++;
          } catch (err) {
            console.error('Erro ao fazer parse do JSON:', err);
          }
        }

        fs.unlinkSync(outputFilePath);
        await this.historyRepository.save(new ImportHistoryEntity(new Date(), file, true));

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await this.historyRepository.save(new ImportHistoryEntity(new Date(), file, false, errorMessage));
      }
    }
  }
}
