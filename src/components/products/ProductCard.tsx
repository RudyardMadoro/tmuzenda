'use client';

import Image from 'next/image';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import type { CatalogueProduct } from '@/types';

const priceLabel = (product: CatalogueProduct) => {
  if (product.price.status === 'verified' && product.price.amount) return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: product.price.currency }).format(product.price.amount);
  return product.price.status === 'unverified' ? 'Price unverified' : 'Price on request';
};

export default function ProductCard({ product, selected, onDetails, onSelect, selectLabel = 'Add to enquiry' }: { product: CatalogueProduct; selected?: boolean; onDetails: () => void; onSelect?: () => void; selectLabel?: string }) {
  return <article className="flex h-full flex-col border border-black/10 bg-[#faf7f0]">
    <div className="relative aspect-[4/3] overflow-hidden bg-[#d9d2c5]"><Image src={product.image.src} alt={product.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" /></div>
    <div className="flex flex-1 flex-col p-6">
      <div className="flex flex-wrap items-center gap-2"><span className="eyebrow text-[#8a6835]">{product.category}</span>{product.illustrative && <span className="rounded-full bg-[#e8e0d1] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Illustrative</span>}</div>
      <h3 className="mt-4 font-serif text-2xl leading-tight">{product.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-[#69655c]">{product.summary}</p>
      <p className="mt-5 text-xs font-bold uppercase tracking-[.12em] text-[#8a6835]">{priceLabel(product)}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2"><button type="button" onClick={onDetails} className="btn-secondary !min-h-11 !px-3">Details <ArrowUpRight size={15} /></button>{onSelect && <button type="button" onClick={onSelect} className="btn-primary !min-h-11 !px-3">{selected ? <Check size={15} /> : <Plus size={15} />}{selected ? 'Selected' : selectLabel}</button>}</div>
    </div>
  </article>;
}
