import { PageIntro, CTA } from '@/components/site/shared';
import { Portfolio } from '@/components/site/interactions';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'أعمالنا',
  'استكشف تصورات واجهات محلات ومقاهٍ، تغليف زجاج وسيارات، بوسترات وشاشات LED. أمثلة توضيحية للخامات وأساليب التنفيذ.',
  '/projects',
);
export default function Projects() {
  return (
    <main id="main">
      <PageIntro
        title="شغل يحمل اسم صاحبه."
        description="كل مساحة إلها تفاصيلها. هنا تشوف كيف تتغيّر الخامة والتوزيع والإضاءة بحسب المكان وطبيعة المشروع."
        crumb={[{ label: 'أعمالنا' }]}
      />
      <section className="wrap portfolio-section">
        <p className="portfolio-disclosure">
          هذه المشاريع افتراضية، والصور مولّدة خصيصًا لتوضيح أساليب العمل. لا تمثل
          أعمالًا منفّذة أو عملاء فعليين.
        </p>
        <Portfolio />
      </section>
      <CTA />
    </main>
  );
}
