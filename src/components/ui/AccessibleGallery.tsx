'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Media } from '@/types';
import { useDialogFocus } from '@/lib/dialog-focus';

export default function AccessibleGallery({ images, label }: { images: Media[]; label: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setActive(null), []);
  useDialogFocus(active !== null, dialogRef, close);

  return <>
    <div className="grid gap-4 sm:grid-cols-2" aria-label={`${label} image gallery`}>{images.map((image, index) => <button key={`${image.src}-${index}`} type="button" onClick={() => setActive(index)} className={`group relative overflow-hidden bg-[#d9d2c5] ${index === 0 ? 'aspect-[16/10] sm:col-span-2' : 'aspect-[4/3]'}`} aria-label={`Open image ${index + 1} of ${images.length}: ${image.alt}`}><Image src={image.src} alt={image.alt} fill sizes={index === 0 ? '(max-width: 1024px) 100vw, 80vw' : '(max-width: 640px) 100vw, 40vw'} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></button>)}</div>
    {active !== null && <div ref={dialogRef} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 sm:p-10" role="dialog" aria-modal="true" aria-label={`${label} image viewer`} onKeyDown={(event) => { if (event.key === 'ArrowRight') setActive((active + 1) % images.length); if (event.key === 'ArrowLeft') setActive((active - 1 + images.length) % images.length); }}>
      <button autoFocus type="button" onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center text-white" aria-label="Close image viewer"><X /></button>
      {images.length > 1 && <><button type="button" onClick={() => setActive((active - 1 + images.length) % images.length)} className="absolute left-2 z-10 grid h-12 w-12 place-items-center text-white sm:left-5" aria-label="Previous image"><ChevronLeft /></button><button type="button" onClick={() => setActive((active + 1) % images.length)} className="absolute right-2 z-10 grid h-12 w-12 place-items-center text-white sm:right-5" aria-label="Next image"><ChevronRight /></button></>}
      <div className="relative h-[75vh] w-full max-w-6xl"><Image src={images[active].src} alt={images[active].alt} fill sizes="100vw" className="object-contain" /><p className="absolute inset-x-0 -bottom-12 text-center text-xs text-white/70">{active + 1} / {images.length} · {images[active].alt}</p></div>
    </div>}
  </>;
}
