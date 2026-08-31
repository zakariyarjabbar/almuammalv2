import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { services, projects } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/about',
    '/services',
    '/projects',
    '/quote',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookies',
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date('2026-08-31T00:00:00Z'),
    changeFrequency:
      path.includes('privacy') || path.includes('terms') ? 'yearly' : 'monthly',
    priority: path === '' ? 1 : path.split('/').length === 2 ? 0.8 : 0.6,
  }));
}
