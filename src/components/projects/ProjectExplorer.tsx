'use client';

import { useState } from 'react';
import ContentCard from '@/components/ui/ContentCard';
import type { Project, ProjectCategory } from '@/types';

const filters: Array<'All' | ProjectCategory> = ['All', 'Transformation', 'Cabinetry', 'Interiors', 'Maintenance'];

export default function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>('All');
  const visible = active === 'All' ? projects : projects.filter((project) => project.category === active);

  return <div>
    <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {filters.map((filter) => <button key={filter} type="button" onClick={() => setActive(filter)} aria-pressed={active === filter} className={`filter-chip ${active === filter ? 'filter-chip-active' : ''}`}>{filter}</button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
    {visible.length > 0 ? <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">{visible.map((item) => <ContentCard key={item.id} href={`/projects/${item.slug}`} image={item.image.src} alt={item.image.alt} eyebrow={`${item.category} · ${item.status}`} title={item.title} copy={item.summary} />)}</div> : <div className="border border-black/10 bg-[#faf7f0] px-6 py-14 text-center"><h2 className="font-serif text-3xl">More work is being documented.</h2><p className="mt-3 text-sm text-[#69655c]">No illustrative examples are published in this category yet.</p></div>}
  </div>;
}
