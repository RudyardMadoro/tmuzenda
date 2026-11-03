'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Minus, Plus, Search, Trash2 } from 'lucide-react';
import type { CatalogueProduct } from '@/types';
import { filterProducts } from '@/lib/product-filtering';
import ProductCard from './ProductCard';
import ProductDetailDialog from './ProductDetailDialog';
import { contact, whatsappUrl } from '@/config/contact';

const SAFE_URL_LENGTH = 1800;

export default function HardwareCatalogue({ products }: { products: CatalogueProduct[] }) {
  const categories = ['All', ...Array.from(new Set(products.map((item) => item.category)))];
  const [category, setCategory] = useState('All'); const [query, setQuery] = useState(''); const [detail, setDetail] = useState<CatalogueProduct>(); const [selection, setSelection] = useState<Record<string, number>>({}); const [copied, setCopied] = useState(false);
  const filtered = useMemo(() => filterProducts(products, category, query), [products, category, query]);
  const selected = products.filter((product) => selection[product.id]);
  const summary = ['TK MUZENDA PROPERTIES — PRODUCT ENQUIRY', '', ...selected.map((product) => `• ${product.name} — quantity ${selection[product.id]}`), '', 'Please confirm specification, compatibility, availability and pricing. This is an enquiry, not an order.'].join('\n');
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent('Product enquiry')}&body=${encodeURIComponent(summary)}`; const whatsapp = `${whatsappUrl('supporting hardware')}%0A%0A${encodeURIComponent(summary)}`; const linksTooLong = Math.max(mailto.length, whatsapp.length) > SAFE_URL_LENGTH;
  const copy = async () => { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 2000); };
  const toggle = (id: string) => setSelection((current) => current[id] ? Object.fromEntries(Object.entries(current).filter(([key]) => key !== id)) : { ...current, [id]: 1 });
  return <>
    <div className="border border-black/10 bg-[#faf7f0] p-4 sm:p-6"><label className="relative block"><span className="sr-only">Search products</span><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a6835]" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search products, uses or specifications" className="min-h-12 w-full border border-black/20 bg-white/60 py-3 pl-12 pr-4 text-base" /></label><div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Filter products by category">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} aria-pressed={category === item} className={`filter-chip shrink-0 ${category === item ? 'filter-chip-active' : ''}`}>{item}</button>)}</div></div>
    <p className="my-6 text-sm text-[#69655c]" aria-live="polite">Showing {filtered.length} of {products.length} products.</p>
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => <ProductCard key={product.id} product={product} selected={Boolean(selection[product.id])} onDetails={() => setDetail(product)} onSelect={() => toggle(product.id)} />)}</div>
    {!filtered.length && <div className="border border-dashed border-black/25 p-10 text-center"><h2 className="font-serif text-3xl">No matching products</h2><button type="button" className="btn-secondary mt-5" onClick={() => { setCategory('All'); setQuery(''); }}>Clear filters</button></div>}
    <aside className="mt-12 bg-[#181815] p-6 text-white sm:p-9" aria-labelledby="enquiry-selection-title"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-[#dbc18f]">Client-side selection</p><h2 id="enquiry-selection-title" className="mt-3 font-serif text-4xl">Enquiry list <span className="text-white/40">({selected.length})</span></h2></div>{selected.length > 0 && <button type="button" onClick={() => setSelection({})} className="text-xs uppercase tracking-wider text-white/60 underline">Clear all</button>}</div>
      {selected.length ? <div className="mt-7 divide-y divide-white/10 border-y border-white/10">{selected.map((product) => <div key={product.id} className="flex flex-wrap items-center justify-between gap-4 py-4"><span>{product.name}</span><div className="flex items-center gap-2"><button type="button" aria-label={`Decrease ${product.name} quantity`} className="grid h-10 w-10 place-items-center border border-white/25" onClick={() => setSelection((current) => ({ ...current, [product.id]: Math.max(1, current[product.id] - 1) }))}><Minus size={15} /></button><span className="min-w-6 text-center" aria-label={`Quantity ${selection[product.id]}`}>{selection[product.id]}</span><button type="button" aria-label={`Increase ${product.name} quantity`} className="grid h-10 w-10 place-items-center border border-white/25" onClick={() => setSelection((current) => ({ ...current, [product.id]: current[product.id] + 1 }))}><Plus size={15} /></button><button type="button" aria-label={`Remove ${product.name}`} className="grid h-10 w-10 place-items-center text-[#dbc18f]" onClick={() => toggle(product.id)}><Trash2 size={16} /></button></div></div>)}</div> : <p className="mt-6 text-sm text-white/55">Add products from the catalogue to prepare an enquiry. Nothing is stored or purchased.</p>}
      {selected.length > 0 && <div className="mt-7 flex flex-wrap gap-3"><a href={linksTooLong ? undefined : mailto} aria-disabled={linksTooLong} className={`btn-light ${linksTooLong ? 'pointer-events-none opacity-40' : ''}`}><Mail size={16} /> Email enquiry</a><a href={linksTooLong ? undefined : whatsapp} target="_blank" rel="noopener noreferrer" aria-disabled={linksTooLong} className={`btn-light ${linksTooLong ? 'pointer-events-none opacity-40' : ''}`}><MessageCircle size={16} /> WhatsApp</a><button type="button" onClick={copy} className="btn-light">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy summary'}</button></div>}{linksTooLong && <p className="mt-4 text-sm text-[#dbc18f]">This specification is too long for a reliable message link. Copy it and paste it into your preferred app.</p>}
    </aside><ProductDetailDialog product={detail} onClose={() => setDetail(undefined)} />
  </>;
}
