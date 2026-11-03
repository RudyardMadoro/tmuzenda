import type { BoardCuttingRequest, CuttingPanel, SupplyBoard } from '@/types';

export interface PanelValidation { length?: string; width?: string; quantity?: string; fit?: string; }

const numberFrom = (value: string) => Number(value);
export const toMillimetres = (value: string, unit: CuttingPanel['unit']) => numberFrom(value) * (unit === 'cm' ? 10 : 1);

export function validatePanel(panel: CuttingPanel, board: SupplyBoard): PanelValidation {
  const errors: PanelValidation = {};
  const length = numberFrom(panel.length);
  const width = numberFrom(panel.width);
  const quantity = numberFrom(panel.quantity);
  if (!Number.isFinite(length) || length <= 0) errors.length = 'Enter a positive length.';
  if (!Number.isFinite(width) || width <= 0) errors.width = 'Enter a positive width.';
  if (!Number.isInteger(quantity) || quantity <= 0) errors.quantity = 'Enter a positive whole quantity.';
  if (!errors.length && !errors.width) {
    const lengthMm = toMillimetres(panel.length, panel.unit);
    const widthMm = toMillimetres(panel.width, panel.unit);
    const fits = (lengthMm <= board.sheet.lengthMm && widthMm <= board.sheet.widthMm) || (widthMm <= board.sheet.lengthMm && lengthMm <= board.sheet.widthMm);
    if (!fits) errors.fit = `Panel exceeds the ${board.sheet.lengthMm} × ${board.sheet.widthMm} mm sheet, including rotation.`;
  }
  return errors;
}

export const panelIsValid = (panel: CuttingPanel, board: SupplyBoard) => Object.keys(validatePanel(panel, board)).length === 0;

export function buildEnquirySummary(requests: BoardCuttingRequest[], boards: SupplyBoard[]): string {
  const boardById = new Map(boards.map((board) => [board.id, board]));
  const lines = ['TK MUZENDA PROPERTIES — BOARD & CUTTING ENQUIRY', '', 'Please review and confirm availability, price and feasibility. This is an enquiry, not an order.', ''];
  requests.forEach((request, requestIndex) => {
    const board = boardById.get(request.boardId);
    if (!board) return;
    lines.push(`${requestIndex + 1}. ${board.name} — ${board.colour}, ${board.finish}, ${board.thicknessMm} mm; sheet ${board.sheet.lengthMm} × ${board.sheet.widthMm} mm`);
    request.panels.forEach((panel, panelIndex) => {
      const edges = panel.edgeBanding.length ? panel.edgeBanding.join(', ') : 'none';
      lines.push(`   Panel ${panelIndex + 1}: ${panel.length} × ${panel.width} ${panel.unit}; qty ${panel.quantity}; edge banding: ${edges}${panel.notes.trim() ? `; notes: ${panel.notes.trim()}` : ''}`);
    });
    lines.push('');
  });
  lines.push('Fit checks shown in the planner are indicative only and are not cutting optimisation or confirmation of manufacturing feasibility.');
  return lines.join('\n');
}
