import { PageIntro } from './shared';
import { legalPages } from '@/lib/legal';
export function LegalPage({ kind }: { kind: keyof typeof legalPages }) {
  const p = legalPages[kind];
  return (
    <main id="main">
      <PageIntro title={p.title} description={p.intro} />
      <div className="wrap legal-layout">
        <aside>
          <p>آخر مراجعة: ٣١ آب ٢٠٢٦</p>
          <nav aria-label="محتويات السياسة">
            <ol>
              {p.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#section-${i + 1}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <article className="legal-content">
          {p.sections.map((s, i) => (
            <section id={`section-${i + 1}`} key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
