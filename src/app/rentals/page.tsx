import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import RentalCatalogue from '@/components/accommodation/RentalCatalogue';
import { contentRepository } from '@/repositories/content-repository';

export const metadata: Metadata = { title: 'Residential Rentals', description: 'Explore illustrative longer-term rental profiles and enquire for verified pricing, terms and availability.' };
export default async function RentalsPage() { const items = await contentRepository.getAccommodation('rental'); return <><PageHero eyebrow="Longer-term accommodation" title="Rentals made clear." copy="Explore local rental profiles, compare practical specifications and request verified terms directly." image="/images/properties/serenity-tower.jpg" /><section className="container-custom py-16 sm:py-24"><div className="mb-12 max-w-3xl border-l-2 border-[#a67c3f] pl-5 text-sm leading-6 text-[#69655c]">Current records and photography are illustrative. Unknown rent, deposit, lease terms and availability are deliberately shown on request.</div><RentalCatalogue items={items} /></section></>; }
