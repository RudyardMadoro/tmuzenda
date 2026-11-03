import type { Metadata } from 'next';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/contact/ContactForm';
import { contact, whatsappUrl } from '@/config/contact';

export const metadata: Metadata = { title: 'Contact', description: 'Call, email, WhatsApp or send an online enquiry to TK Muzenda Properties.' };

const options = [
  { label: 'Call', value: contact.phoneDisplay, href: contact.phoneHref, icon: Phone, external: false },
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail, external: false },
  { label: 'WhatsApp', value: 'Start a conversation', href: whatsappUrl(), icon: MessageCircle, external: true },
];

export default function ContactPage() {
  return <><PageHero eyebrow="Contact" title="Tell us about your space." copy="Whether you are planning a renovation, sourcing boards, considering cabinetry or looking for accommodation, we would be glad to hear what you need." />
    <section className="container-custom py-20 sm:py-28"><div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
      <div><div className="grid gap-px bg-black/10">{options.map(({ label, value, href, icon: Icon, external }) => <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="group flex items-center justify-between bg-[#faf7f0] p-6"><span className="flex items-center gap-4"><Icon className="text-[#a67c3f]" /><span><span className="eyebrow block text-[#8a6835]">{label}</span><span className="mt-2 block text-sm sm:text-base">{value}</span></span></span><ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}</div>
        <address className="mt-8 bg-[#181815] p-7 not-italic text-white sm:p-9"><MapPin className="text-[#dbc18f]" /><h2 className="mt-6 font-serif text-3xl">Visit by arrangement.</h2><p className="mt-4 text-white/65">{contact.address}</p><a href={contact.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-light mt-6">Get directions <ArrowUpRight size={15} /></a></address>
      </div><ContactForm />
    </div></section>
  </>;
}
