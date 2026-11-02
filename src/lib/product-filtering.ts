import type { CatalogueProduct } from '@/types';

export function filterProducts<T extends CatalogueProduct>(products: T[], category: string, query: string): T[] {
  const needle = query.trim().toLocaleLowerCase();
  return products.filter((product) => {
    const categoryMatches = category === 'All' || product.category === category;
    const haystack = [product.name, product.category, product.summary, product.description, ...Object.values(product.specifications)].join(' ').toLocaleLowerCase();
    return categoryMatches && (!needle || haystack.includes(needle));
  });
}
