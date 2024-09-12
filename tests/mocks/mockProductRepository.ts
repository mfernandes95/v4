import { ProductRepositoryImpl } from '../../src/infrastructure/repositories/productRepositoryImpl';
import { jest } from '@jest/globals';

export const mockProductRepository: jest.Mocked<ProductRepositoryImpl> = {
  findByCode: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
};