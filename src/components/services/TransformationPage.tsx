import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import BeforeAfter from '@/components/ui/BeforeAfter';
import { transformationOfferings } from '@/data/phase-two';
import { whatsappUrl } from '@/config/contact';

const process = [
  ['01', 'Listen & assess', 'We clarify the property, priorities, constraints and the outcome you want before defining work.'],
  ['02', 'Shape the scope', 'Requirements become a practical scope, material direction and sequence for transparent discussion.'],
  ['03', 'Coordinate & build', 'Trades, procurement and site activity are coordinated around quality, access and communication.'],
  ['04', 'Refine & hand over', 'Details are reviewed, outstanding items are resolved and care requirements are shared.'],
];

export default function TransformationPage() {
  return <><PageHero eyebrow="Property transformation" title="Reimagine what your property can become." copy="Construction, renovation and interior capability brought together around one clear vision for your space." image="/images/hero/banner-villa.jpg" />
    <section className="container-custom py-20 sm:py-28"><SectionHeading eyebrow="One considered transformation" title="From the structure to the final surface." copy="Choose a focused intervention or a connected, multi-trade scope. We start with what the property needs and build the right team and sequence around it." /><div className="mt-12 grid gap-px bg-black/10 md:grid-cols-2 xl:grid-cols-3">{transformationOfferings.map((item, index) => <ScrollReveal key={item.id} delay={index * 60} className="h-full"><article className="h-full bg-[#faf7f0]"><div className="relative aspect-[4/3] overflow-hidden"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="p-6 sm:p-8"><p className="eyebrow text-[#8a6835]">0{index + 1}</p><h2 className="mt-4 font-serif text-3xl">{item.title}</h2><p className="mt-4 text-sm leading-6 text-[#69655c]">{item.description}</p><ul className="mt-6 grid gap-3">{item.benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm"><Check size={15} className="mt-0.5 shrink-0 text-[#a67c3f]" />{benefit}</li>)}</ul><Link href={`/contact?service=${item.id}`} className="mt-7 inline-flex items-center gap-2 border-b border-[#a67c3f] pb-1 text-xs font-bold uppercase tracking-[.14em]">Enquire about {item.title.toLowerCase()} <ArrowRight size={14} /></Link></div></article></ScrollReveal>)}</div></section>
    <section className="bg-[#181815] py-20 text-white sm:py-28"><div className="container-custom"><SectionHeading light eyebrow="How transformation happens" title="A measured path from need to finished space." /><ol className="mt-12 grid gap-px bg-white/15 lg:grid-cols-4">{process.map(([number, title, copy]) => <li key={number} className="bg-[#181815] p-7 sm:p-9"><span className="eyebrow text-[#dbc18f]">{number}</span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-6 text-white/55">{copy}</p></li>)}</ol></div></section>
    <section className="container-custom py-20 sm:py-28"><div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><SectionHeading eyebrow="Before & after thinking" title="Every transformation starts by seeing possibility." copy="Our early comparisons connect the existing condition, proposed planning and intended atmosphere. The example shown is an illustrative concept—not completed client work." /><Link href="/projects/residence-flow-study" className="btn-secondary mt-8">Explore the example</Link></div><BeforeAfter before={{ src: '/images/properties/floor-plan-sample.jpg', alt: 'Illustrative planning drawing' }} after={{ src: '/images/properties/belgrave-penthouse.jpg', alt: 'Illustrative envisioned finished interior' }} /></div></section>
    <section className="bg-[#d9cfbd] py-16 sm:py-20"><div className="container-custom flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#765829]">Your property, thoughtfully changed</p><h2 className="mt-4 max-w-3xl font-serif text-4xl sm:text-6xl">Start with the space you have—and the life it needs to support.</h2></div><a href={whatsappUrl('construction or renovations')} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">Discuss your transformation</a></div></section>
  </>;
}
