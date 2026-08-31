import type { Metadata } from 'next';
import { business, siteUrl } from './site';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/og.png',
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${business.shortName}`,
      description,
      url: `${siteUrl}${path}`,
      type: 'website',
      locale: 'ar_IQ',
      siteName: business.name,
      images: [
        { url: `${siteUrl}${image}`, width: 1536, height: 1024, alt: title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${business.shortName}`,
      description,
      images: [`${siteUrl}${image}`],
    },
  };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
