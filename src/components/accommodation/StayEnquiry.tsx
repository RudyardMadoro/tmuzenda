'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, MessageCircle, Users } from 'lucide-react';
import { whatsappMessageUrl } from '@/config/contact';

export default function StayEnquiry({ title, slug, maxGuests }: { title: string; slug: string; maxGuests: number }) {
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState(1);
  const invalidDates = Boolean(arrival && departure && departure <= arrival);
  const message = useMemo(() => `Hello TK Muzenda Properties, I would like to enquire about ${title}.${arrival ? ` Preferred arrival: ${arrival}.` : ''}${departure ? ` Preferred departure: ${departure}.` : ''} Guests: ${guests}. I understand this is an enquiry request, not a confirmed reservation.`, [title, arrival, departure, guests]);
  return <div className="border border-black/10 bg-[#faf7f0] p-6 sm:p-8"><p className="eyebrow text-[#8a6835]">Request dates</p><h2 className="mt-3 font-serif text-3xl">Send a stay enquiry</h2><p className="mt-3 text-sm leading-6 text-[#69655c]">Dates and guest details help us respond, but submitting this request does not reserve the property or confirm availability.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]"><span className="flex items-center gap-2"><CalendarDays size={15} />Arrival</span><input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className="min-h-12 border border-black/20 bg-white px-3" /></label><label className="grid gap-2 text-xs font-bold uppercase tracking-[.1em]"><span className="flex items-center gap-2"><CalendarDays size={15} />Departure</span><input type="date" value={departure} min={arrival || undefined} onChange={(e) => setDeparture(e.target.value)} className="min-h-12 border border-black/20 bg-white px-3" /></label></div>
    {invalidDates && <p role="alert" className="mt-3 text-sm text-red-800">Departure must be after arrival.</p>}
    <label className="mt-4 grid gap-2 text-xs font-bold uppercase tracking-[.1em]"><span className="flex items-center gap-2"><Users size={15} />Guests</span><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="min-h-12 border border-black/20 bg-white px-3">{Array.from({ length: maxGuests }, (_, i) => i + 1).map((value) => <option key={value} value={value}>{value} {value === 1 ? 'guest' : 'guests'}</option>)}</select></label>
    <a href={whatsappMessageUrl(message)} target="_blank" rel="noopener noreferrer" aria-disabled={invalidDates} className={`btn-primary mt-6 w-full ${invalidDates ? 'pointer-events-none opacity-50' : ''}`}><MessageCircle size={16} />Request by WhatsApp</a>
    <a href={`/contact?stay=${slug}`} className="mt-4 block text-center text-xs font-bold uppercase tracking-[.12em] underline underline-offset-4">Other contact options</a>
  </div>;
}
