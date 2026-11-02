import test from 'node:test';
import assert from 'node:assert/strict';
import { buildEnquirySummary, toMillimetres, validatePanel } from '../src/lib/cutting-request.ts';
import type { CuttingPanel, SupplyBoard } from '../src/types/index.ts';

const board: SupplyBoard = { id: 'board-test', slug: 'test-board', name: 'Test Board', category: 'Boards', material: 'MDF', finish: 'Raw', colour: 'Natural', thicknessMm: 18, sheet: { lengthMm: 2440, widthMm: 1220 }, summary: 'Test', description: 'Test', image: { src: '/test.jpg', alt: 'Test' }, specifications: {}, price: { currency: 'ZAR', status: 'on-request' }, illustrative: true };
const panel = (patch: Partial<CuttingPanel> = {}): CuttingPanel => ({ id: 'panel-1', length: '1000', width: '500', quantity: '1', unit: 'mm', edgeBanding: [], notes: '', ...patch });

test('converts centimetres to millimetres', () => assert.equal(toMillimetres('72.5', 'cm'), 725));
test('accepts a panel that fits when rotated', () => assert.deepEqual(validatePanel(panel({ length: '1200', width: '2400' }), board), {}));
test('rejects non-positive dimensions and non-whole quantities', () => assert.deepEqual(validatePanel(panel({ length: '0', width: '-4', quantity: '1.5' }), board), { length: 'Enter a positive length.', width: 'Enter a positive width.', quantity: 'Enter a positive whole quantity.' }));
test('rejects a panel larger than the sheet in both orientations', () => assert.match(validatePanel(panel({ length: '2500', width: '1300' }), board).fit ?? '', /exceeds/));
test('summary states enquiry and indicative-fit limitations', () => { const summary = buildEnquirySummary([{ id: 'request-1', boardId: board.id, panels: [panel({ edgeBanding: ['top'], notes: 'grain vertical' })] }], [board]); assert.match(summary, /not an order/i); assert.match(summary, /not cutting optimisation/i); assert.match(summary, /grain vertical/); });
