'use client';

import { X } from 'lucide-react';
import { useCallback, useRef } from 'react';
import type { CatalogueProduct, SupplyBoard } from '@/types';
import { useDialogFocus } from '@/lib/dialog-focus';

export default function ProductDetailDialog({ product, onClose }: { product?: CatalogueProduct; onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useDialogFocus(Boolean(product), dialogRef, close);
  if (!product) return null;
  const board = product.category === 'Boards' ? product as SupplyBoard : undefined;
  return <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/65 p-4" role="presentation" onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="relative my-8 w-full max-w-2xl bg-[#faf7f0] p-6 shadow-2xl sm:p-10">
      <button type="button" autoFocus onClick={onClose} className="absolute right-4 top-4 grid h-11 w-11 place-items-center" aria-label="Close product details"><X /></button>
      <p className="eyebrow pr-12 text-[#8a6835]">{product.category} · {product.illustrative ? 'Illustrative listing' : 'Verified listing'}</p><h2 id="product-dialog-title" className="mt-4 pr-12 font-serif text-4xl">{product.name}</h2><p className="mt-5 leading-7 text-[#69655c]">{product.description}</p>
      {board && <dl className="mt-7 grid grid-cols-2 gap-px bg-black/10"><div className="bg-white/60 p-4"><dt className="eyebrow text-[#8a6835]">Finish</dt><dd className="mt-2 text-sm">{board.colour} · {board.finish}</dd></div><div className="bg-white/60 p-4"><dt className="eyebrow text-[#8a6835]">Thickness</dt><dd className="mt-2 text-sm">{board.thicknessMm} mm</dd></div></dl>}
      <dl className="mt-7 divide-y divide-black/10 border-y border-black/10">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="grid grid-cols-[.8fr_1.2fr] gap-4 py-3 text-sm"><dt className="font-semibold">{key}</dt><dd className="text-[#69655c]">{value}</dd></div>)}</dl>
      <div className="mt-7 border-l-2 border-[#a67c3f] pl-4 text-sm leading-6 text-[#69655c]">Pricing, availability, compatibility and suitability require confirmation. This product view does not reserve stock or submit an order.</div>
    </section>
  </div>;
}
