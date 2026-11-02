import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import AccommodationDetail from '@/components/accommodation/AccommodationDetail';
import { contentRepository } from '@/repositories/content-repository';

export async function generateStaticParams() { return (await contentRepository.getAccommodation('short-stay')).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps<'/short-stays/[slug]'>): Promise<Metadata> { const item = await contentRepository.getAccommodationBySlug((await params).slug); return item?.kind === 'short-stay' ? { title: item.title, description: item.summary } : { title: 'Short stay not found' }; }
async function ShortStayDetails({ params }: { params: Promise<{ slug: string }> }) { const item = await contentRepository.getAccommodationBySlug((await params).slug); if (!item || item.kind !== 'short-stay') notFound(); return <AccommodationDetail item={item} />; }
export default function ShortStayDetailPage({ params }: PageProps<'/short-stays/[slug]'>) { return <Suspense fallback={<div className="min-h-screen bg-[#181815]" aria-label="Loading short-stay details" />}><ShortStayDetails params={params} /></Suspense>; }
