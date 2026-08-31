import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Photo, PageIntro, CTA, Process } from '@/components/site/shared';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'من نحن',
  'تعرّف على فكرة المؤمل وطريقتها في التصميم والطباعة والتصنيع والتركيب في بغداد، مع اختيار الخامة ومراجعة التفاصيل قبل التنفيذ.',
  '/about',
);
export default function About() {
  return (
    <main id="main">
      <PageIntro
        title="ورشة تفهم اسمك، قبل ما تطبعه."
        description="المؤمل للدعاية والإعلان: فكرة استوديو وورشة في بغداد، تجمع التصميم والطباعة وتجهيز الإعلان ضمن مسار واضح، من أول سؤال إلى التسليم."
        crumb={[{ label: 'من نحن' }]}
      />
      <div className="wrap about-photo">
        <Photo
          name="workshop"
          alt="طابعة عريضة وخامات فينيل في ورشة طباعة، صورة توضيحية مولّدة"
          priority
          sizes="100vw"
        />
        <span>حيث تأخذ الأفكار شكلًا ملموسًا.</span>
      </div>
      <section className="wrap about-story section">
        <h2>
          اسم المحل،
          <br />
          مو مجرد لوحة.
        </h2>
        <div>
          <p>
            صاحب المشروع يهتم بالتفصيلة لأنها تظهر باسمه: حرف مقروء، لون قريب من
            هويته، زجاج مرتب أو سيارة تعرّف بخدمته. من هنا جاءت فكرة المؤمل: شغل
            يجمع المظهر المناسب مع قرار عملي في الخامة والتنفيذ.
          </p>
          <p>
            نبدأ بالسؤال عن المكان والاستخدام قبل اقتراح الحل. هل اللوحة بالشمس؟
            من أي مسافة تُقرأ؟ هل التغليف مؤقت؟ هذه الأسئلة تختصر التعديل وتساعدك
            تختار على أساس واضح.
          </p>
          <p>
            القصة والورشة والبيانات المعروضة هنا جزء من هوية شركة افتراضية. لا
            ندّعي سنوات خبرة أو شهادات أو مشاريع حقيقية غير موثّقة.
          </p>
        </div>
      </section>
      <section className="about-standards section">
        <div className="wrap">
          <div className="section-heading">
            <h2>الجودة تبدأ قبل الطباعة.</h2>
          </div>
          <div className="standards-grid">
            <div>
              <h3>ملف مضبوط</h3>
              <p>
                نراجع الدقة والهوامش والمقاس وقراءة الخطوط. نبلغك إذا كانت
                الصورة لا تتحمل التكبير المطلوب.
              </p>
            </div>
            <div>
              <h3>موافقة واضحة</h3>
              <p>
                تعتمد النصوص والأبعاد والتوزيع. وأي تغيير بعد الاعتماد نوضح أثره
                على الوقت والكلفة.
              </p>
            </div>
            <div>
              <h3>فحص قبل التسليم</h3>
              <p>
                نراجع القص والحواف وثبات التجميع، ونختبر الإضاءة والتوصيلات قبل
                نقل القطعة إلى موقعها.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap workshop-capabilities section">
        <div>
          <h2>
            طباعة وتصنيع،
            <br />
            وتفاصيل تجمعهم.
          </h2>
          <p>
            طباعة عريضة، تجهيز ملصقات، قص وتجميع حروف بارزة، إعداد نيون داخلي
            وتنظيم التركيب. نحدد ما يناسب كل مشروع، ونوضح أي تنفيذ متخصص يحتاج
            شريك تجهيز ضمن العرض.
          </p>
          <p>
            المطاعم والمقاهي، المحلات والمعارض، المكاتب والعيادات وفرق التوصيل:
            لكل نشاط إيقاعه، ونعكس ذلك في المقاس والخامة والتوزيع.
          </p>
          <Link href="/services" className="text-link">
            شاهد قدرات كل خدمة <ArrowLeft size={18} />
          </Link>
        </div>
        <Photo name="neon" alt="تفاصيل عبارة عربية بنيون دافئ على جدار أخضر" />
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <h2>تواصل مفهوم، من البداية.</h2>
          <p>تحتاج تعرف ماذا ستستلم، وموعده، وما الذي يشمله السعر.</p>
        </div>
        <Process />
      </section>
      <CTA />
    </main>
  );
}
