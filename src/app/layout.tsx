import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const serif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['500', '600', '700'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://exquisiteproperties.co.za';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Exquisite Properties | Transforming Spaces, Beautifully', template: '%s | Exquisite Properties' },
  description: 'Property transformation, custom cabinetry, board supply, hardware, accommodation and project delivery in Midrand and Gauteng.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Exquisite Properties', description: 'Transforming spaces, beautifully.', type: 'website', locale: 'en_ZA', siteName: 'Exquisite Properties', url: '/', images: [{ url: '/showcase/og-image.png', width: 1200, height: 630, alt: 'Exquisite Properties' }] },
  twitter: { card: 'summary_large_image', title: 'Exquisite Properties', description: 'Transforming spaces, beautifully.', images: ['/showcase/og-image.png'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${siteUrl}/#business`, name: 'Exquisite Properties', url: siteUrl, email: 'rudyardmadoro@gmail.com', telephone: '+27641727623', address: { '@type': 'PostalAddress', streetAddress: '18 Jacaranda Street', addressLocality: 'Midrand', addressRegion: 'Gauteng', addressCountry: 'ZA' }, areaServed: { '@type': 'AdministrativeArea', name: 'Gauteng' } };
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} /></body></html>;
}
