import Link from 'next/link';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';
import { services } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { Photo, PageIntro, CTA } from '@/components/site/shared';
export const metadata = pageMetadata(
  'خدمات الطباعة والإعلان',
  'صور ولوحات، بوسترات، تغليف زجاج وسيارات، نيون داخلي، شاشات LED وإعلانات ضوئية. اعرف الخيارات والخامات المناسبة لمشروعك في بغداد.',
  '/services',
);
export default function Services() {
  return (
    <main id="main">
      <PageIntro
        title="من الورقة، إلى الواجهة."
        description="سبع خدمات تجمع ما يحتاجه مشروعك ليظهر بوضوح. نساعدك تختار الخامة والمقاس وطريقة التنفيذ، ونرتّب التفاصيل قبل البدء."
        crumb={[{ label: 'خدماتنا' }]}
      />
      <section className="wrap service-catalog">
        {services.map((s, i) => (
          <article
            className={`service-catalog-row ${i % 2 ? 'reverse' : ''}`}
            key={s.slug}
          >
            <Link
              href={`/services/${s.slug}`}
              className="catalog-photo"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Photo name={s.image} alt="" priority={i === 0} />
            </Link>
            <div className="catalog-copy">
              <h2>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </h2>
              <p>{s.description}</p>
              <ul className="inline-uses">
                {s.uses.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
              <Link href={`/services/${s.slug}`} className="text-link">
                الخيارات والخامات <ArrowUpLeft size={20} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="wrap choice-help">
        <h2>مو متأكد من الخدمة المناسبة؟</h2>
        <p>
          وصف بسيط للفكرة وصورة للمكان يكفيان حتى نبدأ الحديث. لا تحتاج تعرف اسم
          الخامة من الآن.
        </p>
        <Link href="/quote" className="text-link">
          جهّز تفاصيل مشروعك <ArrowLeft size={18} />
        </Link>
      </section>
      <CTA />
    </main>
  );
}
