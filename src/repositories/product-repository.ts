import type { CatalogueProduct, SupplyBoard } from '@/types';
import { hardwareProducts, supplyBoards } from '@/data/phase-three';

export interface ProductRepository {
  getBoards(): Promise<SupplyBoard[]>;
  getHardwareProducts(): Promise<CatalogueProduct[]>;
}

class StaticProductRepository implements ProductRepository {
  async getBoards() { return supplyBoards; }
  async getHardwareProducts() { return hardwareProducts; }
}

// Swap this adapter for a Spring Boot REST implementation without changing the product UI.
export const productRepository: ProductRepository = new StaticProductRepository();
