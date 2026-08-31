import type { Metadata } from 'next';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import '@fontsource/ibm-plex-sans-arabic/latin-400.css';
import '@fontsource-variable/noto-kufi-arabic';
import './globals.css';
import { Header, Footer, CookieConsent } from '@/components/site/chrome';
import { business, siteUrl } from '@/lib/site';
import { jsonLd } from '@/lib/seo';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'المؤمل — طباعة وإعلانات في بغداد',
    template: '%s | المؤمل',
  },
  description:
    'طباعة، واجهات مضيئة، نيون وتغليف سيارات في بغداد. تعرّف على الخامات والأعمال وجهّز تفاصيل مشروعك لطلب عرض سعر.',
  alternates: { canonical: '/' },
  applicationName: business.name,
  robots: {
    index: process.env.VERCEL_ENV !== 'preview',
    follow: process.env.VERCEL_ENV !== 'preview',
  },
  openGraph: {
    type: 'website',
    locale: 'ar_IQ',
    siteName: business.name,
    title: 'المؤمل — شغل ينشاف. واسم ينحفظ.',
    description:
      'طباعة وواجهات وتغليف، من التصميم إلى آخر لمسة تركيب في بغداد.',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1536,
        height: 1024,
        alt: 'المؤمل للدعاية والإعلان — طباعة، واجهات، تغليف',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المؤمل — طباعة وإعلانات في بغداد',
    description: 'طباعة وواجهات وتغليف، من التصميم إلى التركيب.',
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: business.name,
              url: siteUrl,
              logo: `${siteUrl}/apple-touch-icon.png`,
              description:
                'موقع توضيحي لشركة طباعة وإعلانات افتراضية في بغداد. بيانات الأعمال والتواصل أمثلة غير موثقة.',
            }),
          }}
        />
      </body>
    </html>
  );
}
