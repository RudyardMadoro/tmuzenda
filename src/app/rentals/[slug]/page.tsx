import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import AccommodationDetail from '@/components/accommodation/AccommodationDetail';
import { contentRepository } from '@/repositories/content-repository';

export async function generateStaticParams() { return (await contentRepository.getAccommodation('rental')).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps<'/rentals/[slug]'>): Promise<Metadata> { const item = await contentRepository.getAccommodationBySlug((await params).slug); return item?.kind === 'rental' ? { title: item.title, description: item.summary } : { title: 'Rental not found' }; }
async function RentalDetails({ params }: { params: Promise<{ slug: string }> }) { const item = await contentRepository.getAccommodationBySlug((await params).slug); if (!item || item.kind !== 'rental') notFound(); return <AccommodationDetail item={item} />; }
export default function RentalDetailPage({ params }: PageProps<'/rentals/[slug]'>) { return <Suspense fallback={<div className="min-h-screen bg-[#181815]" aria-label="Loading rental details" />}><RentalDetails params={params} /></Suspense>; }
