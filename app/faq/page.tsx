import { PageIntro, CTA } from '@/components/site/shared';
import { FAQ } from '@/components/site/interactions';
import { pageMetadata, jsonLd } from '@/lib/seo';
import { faqs } from '@/lib/content';
export const metadata = pageMetadata(
  'الأسئلة الشائعة',
  'أجوبة عملية عن مدة الطباعة والتصميم والتركيب والخامات وملفات الطباعة والمقاسات وتغليف السيارات وطلب الأسعار.',
  '/faq',
);
export default function FAQPage() {
  return (
    <main id="main">
      <PageIntro
        title="أسئلة بمحلّها."
        description="هنا جمعنا التفاصيل التي تساعدك تبدأ مشروعك على بيّنة. إذا كان طلبك له ظرف خاص، ضعه ضمن تفاصيل الاستفسار."
        crumb={[{ label: 'الأسئلة الشائعة' }]}
      />
      <section className="wrap faq-page">
        <h2 className="sr-only">تفاصيل الطلب والطباعة والتركيب</h2>
        <FAQ />
      </section>
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </main>
  );
}
