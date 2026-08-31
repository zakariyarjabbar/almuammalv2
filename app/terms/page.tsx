import { LegalPage } from '@/components/site/legal-page';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'الشروط والأحكام',
  'شروط نموذجية للموقع وعروض الأسعار واعتماد التصميم والألوان والخامات والتركيب والإلغاء والدفع والملكية الفكرية.',
  '/terms',
);
export default function Terms() {
  return <LegalPage kind="terms" />;
}
