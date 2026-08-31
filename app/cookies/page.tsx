import { LegalPage } from '@/components/site/legal-page';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'سياسة ملفات تعريف الارتباط',
  'تعرف على تفضيلات الخصوصية والتخزين المحلي والملفات الضرورية وخيارات التحليلات والتسويق في موقع المؤمل.',
  '/cookies',
);
export default function Cookies() {
  return <LegalPage kind="cookies" />;
}
