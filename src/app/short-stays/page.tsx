import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import AccommodationCard from '@/components/accommodation/AccommodationCard';
import { contentRepository } from '@/repositories/content-repository';

export const metadata: Metadata = { title: 'Short Stays', description: 'Browse illustrative short-stay accommodation profiles and request preferred dates and guest requirements.' };
export default async function ShortStaysPage() { const items = await contentRepository.getAccommodation('short-stay'); return <><PageHero eyebrow="Short-stay accommodation" title="Stay on your terms." copy="Browse guest-ready concepts and send preferred dates for a personal, transparent response." image="/images/properties/belgrave-penthouse.jpg" /><section className="container-custom py-16 sm:py-24"><div className="mb-12 grid gap-5 border-l-2 border-[#a67c3f] pl-5 text-sm leading-6 text-[#69655c] sm:grid-cols-2"><p>All current records and photography are illustrative. Nightly rates are shown only when verified.</p><p>This catalogue does not show live availability, confirm bookings or accept payments. Date selections create an enquiry request only.</p></div><div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => <AccommodationCard key={item.id} item={item} priority={index < 3} />)}</div></section></>; }
