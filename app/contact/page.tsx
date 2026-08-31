import { MapPin, ArrowUpLeft, Clock } from 'lucide-react';
import { PageIntro } from '@/components/site/shared';
import { InquiryForm } from '@/components/site/forms';
import { ContactLink } from '@/components/site/chrome';
import { business } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'تواصل معنا',
  'عنوان المؤمل التوضيحي في بغداد، الكرادة، أوقات العمل وطرق التواصل ونموذج تجهيز الاستفسارات. جميع بيانات الاتصال أمثلة افتراضية.',
  '/contact',
);
export default function Contact() {
  return (
    <main id="main">
      <PageIntro
        title="نسمع فكرتك، ونرتّب الباقي."
        description="صورة للمكان، قياس تقريبي، أو حتى سؤال عن خامة. اختَر طريقة التواصل المناسبة، أو جهّز استفسارك من النموذج أدناه."
        crumb={[{ label: 'تواصل معنا' }]}
      />
      <section className="wrap contact-info">
        <div>
          <h2>مباشرة ويا المؤمل</h2>
          <ContactLink kind="phone">
            <bdi>{business.phoneDisplay}</bdi>
          </ContactLink>
          <ContactLink kind="whatsapp">تواصل عبر واتساب</ContactLink>
          <ContactLink kind="email">
            <bdi>{business.email}</bdi>
          </ContactLink>
          <div className="socials">
            <ContactLink kind="instagram" />
            <ContactLink kind="facebook" />
          </div>
        </div>
        <div>
          <h2>
            <Clock size={22} /> أوقات العمل
          </h2>
          <p>{business.hours}</p>
          <p>{business.closed}</p>
          <p className="small-copy">المعاينات والتركيب حسب موعد متفق عليه.</p>
        </div>
        <div className="contact-address">
          <h2>
            <MapPin size={23} /> تلقانا في الكرادة
          </h2>
          <p>{business.address}</p>
          <a
            href={business.map}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            عرض منطقة الكرادة على الخريطة <ArrowUpLeft size={18} />
            <span className="sr-only">يفتح في تبويب جديد</span>
          </a>
          <p className="small-copy">
            موقع عام للمنطقة، وليس دبوسًا لفرع حقيقي. يُفتح مزوّد خرائط خارجي عند
            الضغط فقط.
          </p>
        </div>
      </section>
      <div id="mock-contact" className="wrap contact-disclaimer">
        العنوان والأرقام والحسابات بيانات افتراضية غير موثّقة. أزرار التواصل تعرض
        تنبيهًا ولا تبدأ اتصالًا بجهة حقيقية.
      </div>
      <section className="wrap contact-form-section section">
        <div>
          <h2>اترك التفاصيل هنا.</h2>
          <p>
            نموذج محلي لتجهيز الاستفسار، مع ملخص تستطيع حفظه. لن تصل الرسالة إلى
            فريق عمل حقيقي.
          </p>
        </div>
        <InquiryForm contact />
      </section>
    </main>
  );
}
