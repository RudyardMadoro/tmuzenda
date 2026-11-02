'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Media } from '@/types';

export default function BeforeAfter({ before, after }: { before: Media; after: Media }) {
  const [position, setPosition] = useState(50);
  return <div>
    <div className="relative aspect-[16/10] overflow-hidden bg-[#d9d2c5]">
      <Image src={after.src} alt={after.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}><div className="relative h-full" style={{ width: `${10000 / position}%` }}><Image src={before.src} alt={before.alt} fill sizes="100vw" className="object-cover" /></div></div>
      <span className="absolute left-3 top-3 bg-[#181815]/85 px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white">Planning</span><span className="absolute right-3 top-3 bg-[#181815]/85 px-3 py-2 text-[10px] uppercase tracking-[.18em] text-white">Vision</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${position}%` }} />
    </div>
    <label className="mt-4 block text-xs font-semibold uppercase tracking-[.14em]" htmlFor="comparison-position">Explore the comparison <span className="sr-only">between planning and envisioned finish</span></label>
    <input id="comparison-position" className="comparison-range mt-3 w-full" type="range" min="10" max="90" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-valuetext={`${position}% planning image visible`} />
  </div>;
}
