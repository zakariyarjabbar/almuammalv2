import Link from 'next/link';
import { Check, ArrowLeft } from 'lucide-react';
import { PageIntro } from '@/components/site/shared';
import { InquiryForm } from '@/components/site/forms';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/content';
export const metadata = pageMetadata(
  'اطلب عرض سعر',
  'جهّز تفاصيل مشروعك: الخدمة والمقاسات والكمية والموقع والموعد. نموذج واضح مع اختيار ملفات محلي وملخص قابل للتنزيل.',
  '/quote',
);
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const query = await searchParams;
  const selected = services.some((s) => s.slug === query.service)
    ? query.service!
    : '';
  return (
    <main id="main">
      <PageIntro
        title="خلّ نبدأ بالتفاصيل."
        description="مو لازم تكون كل التفاصيل جاهزة. اكتب اللي تعرفه عن مشروعك، وحدد القياس التقريبي والاستخدام حتى نرتّب صورة أوضح للشغل."
        crumb={[{ label: 'اطلب عرض سعر' }]}
      />
      <section className="wrap form-layout">
        <InquiryForm initialService={selected} />
        <aside className="form-aside">
          <h2>
            شنو يفيدنا
            <br />
            حتى نفهم طلبك؟
          </h2>
          <ul className="check-list">
            <li>
              <Check size={18} />
              صورة للمكان أو المركبة
            </li>
            <li>
              <Check size={18} />
              العرض والارتفاع مع الوحدة
            </li>
            <li>
              <Check size={18} />
              الكمية المطلوبة
            </li>
            <li>
              <Check size={18} />
              داخلي أو خارجي؟
            </li>
            <li>
              <Check size={18} />
              هل تحتاج تصميمًا وتركيبًا؟
            </li>
          </ul>
          <div className="aside-note">
            <h3>السعر يعتمد على التفاصيل.</h3>
            <p>
              الخامة، التشطيب، الموقع والتركيب تغيّر الكلفة. لذلك ما نضع رقمًا
              عامًا يوعدك بشيء مختلف عن طلبك.
            </p>
          </div>
          <Link href="/faq" className="text-link">
            عندك سؤال قبل البدء؟ <ArrowLeft size={17} />
          </Link>
        </aside>
      </section>
    </main>
  );
}
