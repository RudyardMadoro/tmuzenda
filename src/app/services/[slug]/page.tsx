import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import PageHero from '@/components/ui/PageHero';
import TransformationPage from '@/components/services/TransformationPage';
import CabinetryPage from '@/components/services/CabinetryPage';
import { contentRepository } from '@/repositories/content-repository';
export async function generateStaticParams() { return (await contentRepository.getServices()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = await contentRepository.getService((await params).slug); return item ? { title: item.title, description: item.summary } : { title: 'Service not found' }; }
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = await contentRepository.getService(slug); if (!item) notFound(); if (slug === 'property-transformation') return <TransformationPage />; if (slug === 'cabinetry-custom-interiors') return <CabinetryPage />; return <><PageHero eyebrow="TK Muzenda service" title={item.title} copy={item.summary} /><section className="container-custom py-20 sm:py-28"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div className="relative aspect-[4/3] overflow-hidden"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><div><p className="eyebrow text-[#8a6835]">What’s included</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Made to fit the project.</h2><p className="mt-6 leading-7 text-[#69655c]">{item.description}</p><ul className="mt-8 grid gap-4">{item.capabilities.map(capability => <li key={capability} className="flex items-center gap-3 border-b border-black/10 pb-4"><Check size={17} className="text-[#a67c3f]" />{capability}</li>)}</ul><Link href="/contact" className="btn-primary mt-9">Discuss your requirements</Link></div></div></section></>; }
