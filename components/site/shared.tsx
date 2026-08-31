import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { process, type Project } from '@/lib/content';
import { number, siteUrl } from '@/lib/site';
import { jsonLd } from '@/lib/seo';
// Static pre-optimized WebP sources include dimensions and responsive sizes, with no runtime image service.
/* eslint-disable nextjs/no-img-element -- Images are pre-optimized with three responsive WebP variants. */
export function Photo({
  name,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 760px) 100vw, 50vw',
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      src={`/images/${name}-960.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}-1536.webp 1536w`}
      sizes={sizes}
      width="1536"
      height="1024"
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
/* eslint-enable nextjs/no-img-element */
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const all = [{ label: 'الرئيسية', href: '/' }, ...items];
  return (
    <>
      <nav className="breadcrumb" aria-label="مسار التنقل">
        <ol>
          {all.map((n, i) => (
            <li key={i}>
              {n.href ? (
                <Link href={n.href}>{n.label}</Link>
              ) : (
                <span aria-current="page">{n.label}</span>
              )}
              {i < all.length - 1 && <ArrowLeft size={12} aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: all.map((n, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: n.label,
              ...(n.href ? { item: `${siteUrl}${n.href}` } : {}),
            })),
          }),
        }}
      />
    </>
  );
}
export function PageIntro({
  title,
  description,
  crumb,
  children,
}: {
  title: string;
  description: string;
  crumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro wrap">
      <Breadcrumb items={crumb || [{ label: title }]} />
      <div className="page-intro-grid">
        <h1>{title}</h1>
        <div>
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
export function CTA() {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <div>
          <h2>
            عندك فكرة؟
            <br />
            خلّ نضبط تفاصيلها.
          </h2>
          <p>
            أرسل القياس، الكمية، وصورة للمكان.
            <br />
            ونرتّب لك الخطوة التالية على أساس واضح.
          </p>
        </div>
        <div>
          <Link href="/quote" className="btn light">
            اطلب عرض سعر <ArrowUpLeft size={22} />
          </Link>
          <Link href="/contact" className="cta-contact">
            أو تعرّف على طرق التواصل <ArrowLeft size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <ol className="process-list">
      {process.map((p, i) => (
        <li key={p.title}>
          <span className="step-number">{number(i + 1).padStart(2, '٠')}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}
export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <article className={`project-card ${large ? 'project-large' : ''}`}>
      <Link
        href={`/projects/${project.slug}`}
        className="project-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Photo
          name={project.image}
          alt=""
          sizes={large ? '(max-width:760px) 100vw, 65vw' : undefined}
        />
        <span className="image-arrow">
          <ArrowUpLeft size={25} />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <p>
            {project.type} <span>·</span> {project.area}
          </p>
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
        </div>
        <span className="project-category">{project.category}</span>
      </div>
    </article>
  );
}
