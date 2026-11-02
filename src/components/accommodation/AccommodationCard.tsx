import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Bath, BedDouble, MapPin, Users } from 'lucide-react';
import type { Accommodation } from '@/types';

export function formatAccommodationPrice(item: Accommodation) {
  if (!item.price.verified || item.price.amount === undefined) return 'Rate on request';
  return `${item.price.currency} ${item.price.amount.toLocaleString('en-ZA')} / ${item.price.period}`;
}

export default function AccommodationCard({ item, priority = false }: { item: Accommodation; priority?: boolean }) {
  const base = item.kind === 'rental' ? '/rentals' : '/short-stays';
  return <article className="group flex h-full flex-col bg-[#faf7f0]">
    <Link href={`${base}/${item.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#d9d2c5]">
      <Image src={item.images[0].src} alt={item.images[0].alt} fill priority={priority} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
      <span className="absolute left-4 top-4 bg-[#181815]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] text-white">Illustrative listing</span>
    </Link>
    <div className="flex flex-1 flex-col border-x border-b border-black/10 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-[#8a6835]">{item.propertyType}</p><Link href={`${base}/${item.slug}`} className="mt-3 inline-flex items-start gap-2 font-serif text-2xl leading-tight"><span>{item.title}</span><ArrowUpRight size={17} className="mt-1 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link></div><p className="shrink-0 text-right text-xs font-bold">{formatAccommodationPrice(item)}</p></div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-[#69655c]"><MapPin size={14} />{item.location}</p>
      <p className="mt-4 text-sm leading-6 text-[#69655c]">{item.summary}</p>
      <div className="mt-auto flex flex-wrap gap-4 border-t border-black/10 pt-5 text-xs text-[#69655c]">
        <span className="flex items-center gap-1.5"><BedDouble size={15} />{item.bedrooms} {item.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
        <span className="flex items-center gap-1.5"><Bath size={15} />{item.bathrooms} {item.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
        {item.maxGuests && <span className="flex items-center gap-1.5"><Users size={15} />Up to {item.maxGuests}</span>}
      </div>
    </div>
  </article>;
}
