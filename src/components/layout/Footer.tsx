import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contact, whatsappUrl } from '@/config/contact';

export default function Footer() {
  return <footer className="bg-[#181815] text-white">
    <div className="container-custom py-16 lg:py-24">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_.7fr_.7fr]">
        <div><p className="eyebrow text-[#dbc18f]">Spaces, considered</p><h2 className="mt-5 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">Let’s make your property feel exceptional.</h2><Link href="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-[#c7a66a] pb-2 text-sm">Start an enquiry <ArrowUpRight size={16} /></Link></div>
        <div><h3 className="eyebrow text-white/45">Explore</h3><div className="mt-5 grid gap-3 text-sm text-white/70"><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/products">Products</Link><Link href="/rentals">Rentals</Link><Link href="/short-stays">Short stays</Link><Link href="/about">About</Link></div></div>
        <div><h3 className="eyebrow text-white/45">Contact</h3><address className="mt-5 grid gap-4 text-sm not-italic text-white/70"><a className="flex gap-3" href={contact.phoneHref}><Phone size={16} />{contact.phoneDisplay}</a><a className="flex gap-3" href={`mailto:${contact.email}`}><Mail size={16} />{contact.email}</a><a className="flex gap-3" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} />WhatsApp</a><a className="flex gap-3" href={contact.directionsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} />{contact.address}</a></address></div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 TK Muzenda Properties. All rights reserved.</span><span>Illustrative photography retained under the source template asset terms.</span></div>
    </div>
  </footer>;
}
