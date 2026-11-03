import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/contact/FloatingWhatsApp';
import { contact } from '@/config/contact';
import './globals.css';

const sans = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const serif = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['500', '600', '700'] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'TK Muzenda Properties',
  title: { default: 'TK Muzenda Properties | Transforming Spaces, Beautifully', template: '%s | TK Muzenda Properties' },
  description: 'Property transformation, custom cabinetry, board supply, supporting hardware, accommodation and project delivery.',
  alternates: { canonical: '/' },
  openGraph: { title: 'TK Muzenda Properties', description: 'Transforming spaces, beautifully.', type: 'website', locale: 'en_ZA', siteName: 'TK Muzenda Properties', url: '/', images: [{ url: '/images/hero/hero-luxury-villa.jpg', alt: 'Contemporary property representing TK Muzenda Properties' }] },
  twitter: { card: 'summary_large_image', title: 'TK Muzenda Properties', description: 'Transforming spaces, beautifully.', images: ['/images/hero/hero-luxury-villa.jpg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': `${siteUrl}/#business`, name: contact.businessName, url: siteUrl, email: contact.email, telephone: contact.phoneE164, address: { '@type': 'PostalAddress', streetAddress: contact.address } };
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /><FloatingWhatsApp /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} /></body></html>;
}
