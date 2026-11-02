import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { accommodation } from '../src/data/accommodation.ts';
import { projects, services } from '../src/data/content.ts';
import { hardwareProducts, supplyBoards } from '../src/data/phase-three.ts';

const allMedia = [
  ...services.map((item) => item.image),
  ...projects.flatMap((item) => [item.image, ...item.gallery]),
  ...accommodation.flatMap((item) => item.images),
  ...hardwareProducts.map((item) => item.image),
  ...supplyBoards.map((item) => item.image),
];

test('all public content slugs are unique within their route collections', () => {
  for (const collection of [services, projects, accommodation.filter((item) => item.kind === 'rental'), accommodation.filter((item) => item.kind === 'short-stay'), hardwareProducts, supplyBoards]) {
    const slugs = collection.map((item) => item.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  }
});

test('all referenced local content images exist and have meaningful alt text', () => {
  for (const media of allMedia) {
    assert.ok(media.alt.trim().length >= 8, `Alt text is too short for ${media.src}`);
    assert.ok(media.src.startsWith('/'), `Expected a local image path: ${media.src}`);
    assert.ok(existsSync(join(process.cwd(), 'public', media.src)), `Missing image: ${media.src}`);
  }
});

test('unverified accommodation cannot expose a numeric price', () => {
  for (const item of accommodation) {
    if (!item.price.verified) assert.equal(item.price.amount, undefined, `${item.slug} has an unverified price amount`);
    assert.equal(item.illustrative, true, `${item.slug} must remain illustrative until verified`);
  }
});
