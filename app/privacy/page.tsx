import { LegalPage } from '@/components/site/legal-page';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'سياسة الخصوصية',
  'تعرف على تعامل نموذج المؤمل التوضيحي مع بيانات النماذج والملفات والتخزين المحلي والأطراف الخارجية وخيارات الخصوصية.',
  '/privacy',
);
export default function Privacy() {
  return <LegalPage kind="privacy" />;
}
