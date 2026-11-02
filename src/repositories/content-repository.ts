import type { Accommodation, Board, Product, Project, Property, Service } from '@/types';
import { boards, products, projects, properties, services } from '@/data/content';
import { accommodation } from '@/data/accommodation';

export interface ContentRepository {
  getServices(): Promise<Service[]>;
  getService(slug: string): Promise<Service | undefined>;
  getProjects(): Promise<Project[]>;
  getProject(slug: string): Promise<Project | undefined>;
  getProducts(): Promise<Product[]>;
  getBoards(): Promise<Board[]>;
  getProperties(): Promise<Property[]>;
  getAccommodation(kind?: Accommodation['kind']): Promise<Accommodation[]>;
  getAccommodationBySlug(slug: string): Promise<Accommodation | undefined>;
}

class StaticContentRepository implements ContentRepository {
  async getServices() { return services; }
  async getService(slug: string) { return services.find((item) => item.slug === slug); }
  async getProjects() { return projects; }
  async getProject(slug: string) { return projects.find((item) => item.slug === slug); }
  async getProducts() { return products; }
  async getBoards() { return boards; }
  async getProperties() { return properties; }
  async getAccommodation(kind?: Accommodation['kind']) { return kind ? accommodation.filter((item) => item.kind === kind) : accommodation; }
  async getAccommodationBySlug(slug: string) { return accommodation.find((item) => item.slug === slug); }
}

// Replace this instance with a Spring Boot REST adapter when the API is ready.
export const contentRepository: ContentRepository = new StaticContentRepository();
