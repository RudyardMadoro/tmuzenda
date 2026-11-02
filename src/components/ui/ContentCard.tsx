import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ContentCard({ href, image, alt, eyebrow, title, copy }: { href: string; image: string; alt: string; eyebrow: string; title: string; copy: string }) {
  return <Link href={href} className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-[#d9d2c5]"><Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" /></div><div className="border-x border-b border-black/10 bg-[#faf7f0] p-6"><div className="flex items-center justify-between"><p className="eyebrow text-[#8a6835]">{eyebrow}</p><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><h3 className="mt-4 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-[#69655c]">{copy}</p></div></Link>;
}
