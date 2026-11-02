import Image from 'next/image';
export default function PageHero({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image?: string }) {
  return <section className="relative overflow-hidden bg-[#181815] pb-20 pt-36 text-white sm:pb-28 sm:pt-44">{image && <><Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/20" /></>}<div className="container-custom relative"><p className="eyebrow text-[#dbc18f]">{eyebrow}</p><h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[.98] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">{copy}</p></div></section>;
}
