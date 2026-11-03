import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import AccessibleGallery from '@/components/ui/AccessibleGallery';
import BeforeAfter from '@/components/ui/BeforeAfter';
import SectionHeading from '@/components/ui/SectionHeading';
import { contentRepository } from '@/repositories/content-repository';

export async function generateStaticParams() { return (await contentRepository.getProjects()).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const project = await contentRepository.getProject((await params).slug); return project ? { title: project.title, description: project.summary } : { title: 'Project not found' }; }

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await contentRepository.getProject((await params).slug);
  if (!project) notFound();
  return <><section className="bg-[#181815] pb-16 pt-32 text-white sm:pb-20 sm:pt-40"><div className="container-custom"><Link href="/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] text-white/55"><ArrowLeft size={14} />All project studies</Link><p className="eyebrow mt-10 text-[#dbc18f]">{project.category} · {project.service}</p><h1 className="mt-5 max-w-5xl font-serif text-5xl leading-none sm:text-7xl lg:text-8xl">{project.title}</h1><div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[.12em] text-white/50"><span>{project.location}</span><span>{project.status}</span></div></div></section>
    <section className="container-custom py-14 sm:py-20"><div className="mb-12 border-l-2 border-[#a67c3f] bg-[#faf7f0] p-5 text-sm leading-6 text-[#69655c]"><strong className="text-[#24231f]">Illustrative example:</strong> this study uses licensed placeholder imagery to explain a possible brief, scope and design direction. It is not a completed TK Muzenda Properties client project.</div><AccessibleGallery images={project.gallery} label={project.title} /></section>
    <section className="container-custom pb-20 sm:pb-28"><div className="grid gap-12 lg:grid-cols-[1fr_.8fr]"><div><SectionHeading eyebrow="The study" title={project.summary} /><p className="mt-6 max-w-2xl leading-7 text-[#69655c]">{project.description}</p></div><div className="border-t border-black/15 pt-6"><p className="eyebrow text-[#8a6835]">Indicative scope</p><ul className="mt-6 grid gap-4">{project.scope.map((item) => <li key={item} className="flex gap-3 border-b border-black/10 pb-4 text-sm"><Check size={16} className="shrink-0 text-[#a67c3f]" />{item}</li>)}</ul></div></div></section>
    {project.beforeAfter && <section className="bg-[#e8e0d1] py-20 sm:py-28"><div className="container-custom"><div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:items-center"><SectionHeading eyebrow="Planning to vision" title="Compare the starting point with the intended atmosphere." copy={project.beforeAfter.note} /><BeforeAfter before={project.beforeAfter.before} after={project.beforeAfter.after} /></div></div></section>}
    <section className="bg-[#181815] py-16 text-white sm:py-20"><div className="container-custom flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#dbc18f]">Have a related brief?</p><h2 className="mt-4 max-w-3xl font-serif text-4xl sm:text-6xl">Let’s shape a scope around your actual space.</h2></div><Link href={`/contact?project=${project.slug}`} className="btn-light shrink-0">Start a transparent enquiry</Link></div></section>
  </>;
}
