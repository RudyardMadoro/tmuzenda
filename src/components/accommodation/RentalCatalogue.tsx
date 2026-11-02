'use client';

import { useMemo, useState } from 'react';
import { RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import type { Accommodation } from '@/types';
import AccommodationCard from './AccommodationCard';

const fieldClass = 'min-h-12 w-full border border-black/20 bg-[#faf7f0] px-3 text-sm text-[#24231f]';

export default function RentalCatalogue({ items }: { items: Accommodation[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState('all');
  const [type, setType] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');
  const [bathrooms, setBathrooms] = useState('any');
  const [price, setPrice] = useState('all');
  const [availability, setAvailability] = useState('all');
  const filtered = useMemo(() => items.filter((item) => {
    if (location !== 'all' && item.location !== location) return false;
    if (type !== 'all' && item.propertyType !== type) return false;
    if (bedrooms !== 'any' && item.bedrooms < Number(bedrooms)) return false;
    if (bathrooms !== 'any' && item.bathrooms < Number(bathrooms)) return false;
    if (price === 'known' && (!item.price.verified || item.price.amount === undefined)) return false;
    if (availability === 'known' && !item.availability) return false;
    return true;
  }), [items, location, type, bedrooms, bathrooms, price, availability]);
  const reset = () => { setLocation('all'); setType('all'); setBedrooms('any'); setBathrooms('any'); setPrice('all'); setAvailability('all'); };
  const controls = <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Location<select className={fieldClass} value={location} onChange={(e) => setLocation(e.target.value)}><option value="all">All locations</option>{[...new Set(items.map((item) => item.location))].map((value) => <option key={value}>{value}</option>)}</select></label>
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Property type<select className={fieldClass} value={type} onChange={(e) => setType(e.target.value)}><option value="all">All property types</option>{[...new Set(items.map((item) => item.propertyType))].map((value) => <option key={value}>{value}</option>)}</select></label>
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Bedrooms<select className={fieldClass} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}><option value="any">Any bedrooms</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option></select></label>
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Bathrooms<select className={fieldClass} value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}><option value="any">Any bathrooms</option><option value="1">1+</option><option value="2">2+</option></select></label>
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Price information<select className={fieldClass} value={price} onChange={(e) => setPrice(e.target.value)}><option value="all">All price statuses</option><option value="known">Verified price only</option></select></label>
    <label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]">Availability information<select className={fieldClass} value={availability} onChange={(e) => setAvailability(e.target.value)}><option value="all">All availability statuses</option><option value="known">Known availability only</option></select></label>
    <button type="button" onClick={reset} className="btn-secondary"><RotateCcw size={15} />Reset filters</button>
  </div>;
  return <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
    <aside className="hidden lg:block"><h2 className="mb-6 font-serif text-2xl">Refine rentals</h2>{controls}</aside>
    <div><div className="mb-7 flex items-center justify-between gap-4"><p aria-live="polite" className="text-sm text-[#69655c]"><strong className="text-[#24231f]">{filtered.length}</strong> illustrative {filtered.length === 1 ? 'rental' : 'rentals'}</p><button type="button" className="btn-secondary lg:hidden" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="rental-mobile-filters"><SlidersHorizontal size={16} />Filters</button></div>
      {filtered.length ? <div className="grid gap-7 md:grid-cols-2">{filtered.map((item, index) => <AccommodationCard key={item.id} item={item} priority={index < 2} />)}</div> : <div className="border border-black/10 bg-[#faf7f0] p-10 text-center"><h2 className="font-serif text-3xl">No matching records</h2><p className="mt-3 text-sm text-[#69655c]">Try broadening the filters. Verified inventory is still being prepared.</p></div>}
    </div>
    {mobileOpen && <div id="rental-mobile-filters" role="dialog" aria-modal="true" aria-label="Rental filters" className="fixed inset-0 z-[70] overflow-y-auto bg-[#f4f0e8] p-5 pt-24 lg:hidden"><div className="mx-auto max-w-xl"><div className="mb-8 flex items-center justify-between"><h2 className="font-serif text-3xl">Refine rentals</h2><button autoFocus type="button" className="grid h-12 w-12 place-items-center" onClick={() => setMobileOpen(false)} aria-label="Close filters"><X /></button></div>{controls}<button type="button" className="btn-primary mt-5 w-full" onClick={() => setMobileOpen(false)}>Show {filtered.length} results</button></div></div>}
  </div>;
}
