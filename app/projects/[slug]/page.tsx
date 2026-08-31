import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { projects, services } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageIntro, CTA, ProjectCard } from '@/components/site/shared';
import { ProjectGallery } from '@/components/site/interactions';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? pageMetadata(
        p.name,
        p.description,
        `/projects/${p.slug}`,
        `/images/${p.image}-1536.webp`,
      )
    : { title: 'العمل غير موجود' };
}
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main id="main">
      <PageIntro
        title={p.name}
        description={p.description}
        crumb={[{ label: 'أعمالنا', href: '/projects' }, { label: p.type }]}
      />
      <section className="wrap">
        <div className="project-meta">
          <span>
            {p.type} / {p.area}، بغداد
          </span>
          <span>مشروع افتراضي · صورة توضيحية مولّدة</span>
        </div>
        <ProjectGallery project={p} />
        <div className="project-story section">
          <div>
            <h2>المطلوب من الفكرة</h2>
            <p>{p.challenge}</p>
            <h2>طريقة التنفيذ المقترحة</h2>
            <p>{p.solution}</p>
          </div>
          <aside>
            <dl>
              {p.details.map((d) => (
                <div key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
            <h3>الخدمات المستخدمة</h3>
            <div className="project-services">
              {p.services.map((slug) => {
                const s = services.find((s) => s.slug === slug)!;
                return (
                  <Link href={`/services/${slug}`} key={slug}>
                    {s.name}
                    <ArrowUpLeft size={17} />
                  </Link>
                );
              })}
            </div>
            <Link href={`/quote?service=${p.services[0]}`} className="btn">
              عندك مشروع مشابه؟ <ArrowUpLeft size={18} />
            </Link>
          </aside>
        </div>
        <section className="next-project">
          <div>
            <h2>فكرة ثانية، بحضور مختلف.</h2>
            <Link href="/projects" className="text-link">
              رجوع لكل الأعمال <ArrowLeft size={18} />
            </Link>
          </div>
          <ProjectCard project={next} />
        </section>
      </section>
      <CTA />
    </main>
  );
}
