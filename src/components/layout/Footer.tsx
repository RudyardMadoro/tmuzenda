import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const whatsapp = 'https://wa.me/27641727623';

export default function Footer() {
  return <footer className="bg-[#181815] text-white">
    <div className="container-custom py-16 lg:py-24">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_.7fr_.7fr]">
        <div><p className="eyebrow text-[#dbc18f]">Spaces, considered</p><h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">Let’s make your property feel exceptional.</h2><Link href="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-[#c7a66a] pb-2 text-sm">Start an enquiry <ArrowUpRight size={16} /></Link></div>
        <div><h3 className="eyebrow text-white/45">Explore</h3><div className="mt-5 grid gap-3 text-sm text-white/70"><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/products">Products</Link><Link href="/rentals">Rentals</Link><Link href="/short-stays">Short stays</Link><Link href="/about">About</Link></div></div>
        <div><h3 className="eyebrow text-white/45">Contact</h3><address className="mt-5 grid gap-4 text-sm not-italic text-white/70"><a className="flex gap-3" href="mailto:rudyardmadoro@gmail.com"><Mail size={16} />rudyardmadoro@gmail.com</a><a className="flex gap-3" href="tel:+27641727623"><Phone size={16} />+27 64 172 7623</a><a className="flex gap-3" href={whatsapp} target="_blank" rel="noreferrer"><ArrowUpRight size={16} />WhatsApp</a><a className="flex gap-3" href="https://www.google.com/maps/search/?api=1&amp;query=18%20Jacaranda%20Street%2C%20Noordwyk%2C%20Midrand" target="_blank" rel="noreferrer"><MapPin size={16} /><span>18 Jacaranda Street<br />Noordwyk, Midrand</span></a></address></div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 Exquisite Properties. All rights reserved.</span><span>Illustrative photography retained under the source template asset terms.</span></div>
    </div>
  </footer>;
}
