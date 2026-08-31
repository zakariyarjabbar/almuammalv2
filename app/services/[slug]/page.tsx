import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpLeft, Check } from 'lucide-react';
import { services, projects } from '@/lib/content';
import { business, siteUrl } from '@/lib/site';
import { pageMetadata, jsonLd } from '@/lib/seo';
import { Photo, PageIntro, CTA, ProjectCard } from '@/components/site/shared';
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? pageMetadata(
        `${s.name} في بغداد`,
        s.description,
        `/services/${s.slug}`,
        `/images/${s.image}-1536.webp`,
      )
    : { title: 'الخدمة غير موجودة' };
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  const related = projects.filter((p) => p.services.includes(slug)).slice(0, 2);
  return (
    <main id="main">
      <PageIntro
        title={s.name}
        description={s.tagline}
        crumb={[{ label: 'خدماتنا', href: '/services' }, { label: s.name }]}
      >
        <Link href={`/quote?service=${s.slug}`} className="btn">
          اطلب عرض سعر لهذه الخدمة <ArrowUpLeft size={18} />
        </Link>
      </PageIntro>
      <section className="wrap service-detail-top">
        <Photo name={s.image} alt={s.alt} priority />
        <div>
          <h2>
            اختيار مناسب.
            <br />
            ونتيجة محسوبة.
          </h2>
          <p>{s.description}</p>
          <h3>تناسب هذه المشاريع</h3>
          <ul className="check-list">
            {s.uses.map((x) => (
              <li key={x}>
                <Check size={17} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="wrap section detail-columns">
        <div>
          <h2>الخيارات المتاحة</h2>
          <ul className="plain-list">
            {s.options.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>الخامات والتشطيب</h2>
          <ul className="plain-list">
            {s.materials.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="small-copy">
            نؤكد النوع والمواصفات والتوفر في عرض السعر، قبل اعتماد التنفيذ.
          </p>
        </div>
      </section>
      <section className="detail-process">
        <div className="wrap detail-process-inner">
          <h2>شلون نشتغل عليها؟</h2>
          <ol>
            {s.steps.map((x, i) => (
              <li key={x}>
                <span>{new Intl.NumberFormat('ar-IQ').format(i + 1)}</span>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="wrap installation section">
        <div>
          <h2>التجهيز والتركيب</h2>
          <p>{s.finish}</p>
        </div>
        <aside>
          <h3>قبل ما تختار</h3>
          <p>{s.note}</p>
        </aside>
      </section>
      {related.length > 0 && (
        <section className="wrap related-section section">
          <div className="section-heading">
            <div>
              <h2>الفكرة، لما تأخذ شكل.</h2>
              <p>نماذج توضيحية لاستخدام هذه الخدمة.</p>
            </div>
          </div>
          <div className="related-grid">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.name,
            description: s.description,
            serviceType: s.name,
            areaServed: { '@type': 'City', name: 'بغداد' },
            provider: {
              '@type': 'Organization',
              name: business.name,
              url: siteUrl,
            },
            url: `${siteUrl}/services/${slug}`,
          }),
        }}
      />
    </main>
  );
}
