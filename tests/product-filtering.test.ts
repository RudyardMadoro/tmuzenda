import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProducts } from '../src/lib/product-filtering.ts';
import type { CatalogueProduct } from '../src/types/index.ts';

const products: CatalogueProduct[] = [
  { id: '1', slug: 'screw', name: 'Chipboard Screw', category: 'Screws', summary: 'Cabinet assembly', description: 'Countersunk fixing', image: { src: '/a', alt: 'a' }, specifications: { Finish: 'Zinc' }, price: { currency: 'ZAR', status: 'on-request' }, illustrative: true },
  { id: '2', slug: 'hinge', name: 'Concealed Hinge', category: 'Fittings', summary: 'Soft closing', description: 'Cabinet fitting', image: { src: '/b', alt: 'b' }, specifications: { Angle: '110 degrees' }, price: { currency: 'ZAR', status: 'unverified' }, illustrative: true },
];

test('filters by category', () => assert.deepEqual(filterProducts(products, 'Screws', '').map((item) => item.id), ['1']));
test('searches names, copy and specifications case-insensitively', () => { assert.deepEqual(filterProducts(products, 'All', 'ZINC').map((item) => item.id), ['1']); assert.deepEqual(filterProducts(products, 'All', '110 degrees').map((item) => item.id), ['2']); });
test('combines category and search filters', () => assert.equal(filterProducts(products, 'Screws', 'soft').length, 0));
