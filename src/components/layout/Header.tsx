'use client';

import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contact } from '@/config/contact';

const services = [
  ['Property transformation', '/services/property-transformation'],
  ['Cabinetry & custom interiors', '/services/cabinetry-custom-interiors'],
  ['Board supply & cutting', '/services/board-supply-cutting'],
  ['Supporting hardware', '/services/supporting-hardware'],
  ['Accommodation', '/accommodation'],
  ['Project delivery', '/services/projects'],
];

const nav = [['Products', '/products'], ['Projects', '/projects'], ['About', '/about'], ['Contact', '/contact']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', close); };
  }, [open]);

  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#181815]/90 text-white backdrop-blur-xl">
    <a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>
    <div className="container-custom flex h-20 items-center justify-between">
      <Link href="/" aria-label="TK Muzenda Properties home" className="relative z-50 leading-none">
        <span className="block font-serif text-[17px] tracking-[.035em] sm:text-[19px]">TK MUZENDA</span><span className="mt-1 block text-[8px] uppercase tracking-[.38em] text-white/60">Properties</span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
        <div className="group relative py-7">
          <Link href="/accommodation" className={`nav-link flex items-center gap-1.5 ${pathname.startsWith('/accommodation') || pathname.startsWith('/rentals') || pathname.startsWith('/short-stays') ? 'text-[#dbc18f]' : ''}`}>Accommodation <ChevronDown size={13} /></Link>
          <div className="invisible absolute left-1/2 top-[76px] w-52 -translate-x-1/2 translate-y-2 border border-black/10 bg-[#f4f0e8] p-2 text-[#24231f] opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"><Link href="/rentals" className="block px-4 py-3 text-[13px] hover:bg-[#e8e0d1]">Rentals</Link><Link href="/short-stays" className="block px-4 py-3 text-[13px] hover:bg-[#e8e0d1]">Short stays</Link></div>
        </div>
        <div className="group relative py-7">
          <Link href="/services" className="nav-link flex items-center gap-1.5">Services <ChevronDown size={13} /></Link>
          <div className="invisible absolute left-1/2 top-[76px] w-72 -translate-x-1/2 translate-y-2 border border-black/10 bg-[#f4f0e8] p-2 text-[#24231f] opacity-0 shadow-2xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            {services.map(([label, href]) => <Link key={href} href={href} className="block px-4 py-3 text-[13px] hover:bg-[#e8e0d1]">{label}</Link>)}
          </div>
        </div>
        {nav.map(([label, href]) => <Link key={href} href={href} className={`nav-link ${pathname === href ? 'text-[#dbc18f]' : ''}`}>{label}</Link>)}
      </nav>
      <Link href="/contact" className="hidden border border-[#c7a66a] px-5 py-2.5 text-xs uppercase tracking-[.18em] text-[#efd8aa] transition-colors hover:bg-[#c7a66a] hover:text-[#181815] lg:inline-flex">Start a project</Link>
      <button onClick={() => setOpen(!open)} className="relative z-50 grid h-11 w-11 place-items-center lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="fixed inset-0 h-[100dvh] overflow-y-auto overscroll-contain bg-[#181815] px-6 pb-10 pt-28 lg:hidden" aria-label="Mobile navigation">
      <div className="mx-auto max-w-xl space-y-1">
        <Link href="/accommodation" onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-serif text-3xl">Accommodation</Link>
        <div className="grid grid-cols-2 border-b border-white/10 py-3"><Link href="/rentals" onClick={() => setOpen(false)} className="py-2 text-sm text-white/60">Rentals</Link><Link href="/short-stays" onClick={() => setOpen(false)} className="py-2 text-sm text-white/60">Short stays</Link></div>
        <Link href="/services" onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-serif text-3xl">Services</Link>
        <div className="grid grid-cols-1 border-b border-white/10 py-3 sm:grid-cols-2">{services.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 text-sm text-white/60">{label}</Link>)}</div>
        {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 font-serif text-3xl">{label}</Link>)}
        <a href={contact.phoneHref} className="mt-8 inline-block text-[#dbc18f]">{contact.phoneDisplay}</a>
      </div>
    </nav>}
  </header>;
}
