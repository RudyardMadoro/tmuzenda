import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import { contentRepository } from '@/repositories/content-repository';
export const metadata: Metadata = { title: 'Services', description: 'Property transformation, custom cabinetry, boards, hardware, accommodation and project delivery.' };
export default async function ServicesPage() { const services = await contentRepository.getServices(); return <><PageHero eyebrow="Our services" title="Everything a better space needs." copy="Practical capability, careful coordination and a refined eye—from structural work to the details you touch every day." image="/images/hero/banner-villa.jpg" /><section className="container-custom py-20 sm:py-28"><div className="grid gap-px bg-black/10 lg:grid-cols-2">{services.map((item, i) => <Link href={`/services/${item.slug}`} key={item.id} className="group bg-[#f4f0e8] p-7 sm:p-10"><span className="text-xs text-[#8a6835]">0{i + 1}</span><h2 className="mt-6 font-serif text-3xl sm:text-4xl">{item.title}</h2><p className="mt-4 max-w-xl leading-7 text-[#69655c]">{item.summary}</p><span className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[.16em]">Explore service <ArrowRight size={15} /></span></Link>)}</div></section></>; }
