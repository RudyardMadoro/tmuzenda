import type { MetadataRoute } from 'next';
import { projects, services } from '@/data/content';
import { accommodation } from '@/data/accommodation';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const routes = ['', '/services', '/projects', '/products', '/products/boards', '/products/hardware', '/accommodation', '/rentals', '/short-stays', '/about', '/contact', '/privacy', '/terms', ...services.map(item => `/services/${item.slug}`), ...projects.map(item => `/projects/${item.slug}`), ...accommodation.map(item => `${item.kind === 'rental' ? '/rentals' : '/short-stays'}/${item.slug}`)];
  return routes.map(route => ({ url: `${base}${route}`, lastModified: '2026-11-02', changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : .8 }));
}
