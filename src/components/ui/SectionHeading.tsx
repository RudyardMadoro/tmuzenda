export default function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className="max-w-3xl"><p className={`eyebrow ${light ? 'text-[#dbc18f]' : 'text-[#8a6835]'}`}>{eyebrow}</p><h2 className={`mt-4 font-serif text-4xl leading-[1.08] sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-[#24231f]'}`}>{title}</h2>{copy && <p className={`mt-5 max-w-2xl text-base leading-7 ${light ? 'text-white/60' : 'text-[#666258]'}`}>{copy}</p>}</div>;
}
