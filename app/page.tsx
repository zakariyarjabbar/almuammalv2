import Link from 'next/link';
import { ArrowUpLeft, ArrowLeft, Asterisk, Check } from 'lucide-react';
import { services, projects } from '@/lib/content';
import { Photo, CTA, Process, ProjectCard } from '@/components/site/shared';
import { FAQ } from '@/components/site/interactions';
export default function Home() {
  return (
    <main id="main">
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>
            شغل ينشاف.
            <br />
            <span>واسم ينحفظ.</span>
          </h1>
          <p>
            من أول فكرة لآخر لمسة تركيب، نطبع ونصنع إعلانات تحمل اسم مشروعك بوضوح.
            واجهات، طباعة وتغليف… بشغل مرتب من بغداد.
          </p>
          <div className="actions">
            <Link className="btn" href="/quote">
              خلّ نحچي عن مشروعك <ArrowUpLeft size={20} />
            </Link>
            <Link className="text-link" href="/projects">
              شاهد أعمالنا <ArrowLeft size={18} />
            </Link>
          </div>
          <div className="hero-note">
            تصميم مدروس <i /> خامة مناسبة <i /> تنفيذ متقن
          </div>
        </div>
        <figure className="hero-image">
          <Photo
            name="cafe"
            alt="تصور لواجهة مقهى رواق بحروف عربية مضيئة وخامة خضراء داكنة"
            priority
          />
          <figcaption>
            <span>حضور يبان، بالنهار وبالليل.</span>
            <Link href="/services/illuminated-signs">
              واجهات وحروف مضيئة <ArrowUpLeft size={18} />
            </Link>
          </figcaption>
        </figure>
      </section>
      <div className="service-ticker" aria-hidden="true">
        <div>
          طباعة بمختلف المقاسات <Asterisk /> واجهات تلفت النظر <Asterisk />{' '}
          تغليف يحكي عنك <Asterisk /> من التصميم إلى التركيب
        </div>
      </div>
      <section className="wrap services-home section">
        <div className="section-heading">
          <div>
            <h2>
              كل ما يحتاجه اسمك
              <br />
              حتى يظهر بالشكل الصحيح.
            </h2>
            <p>حلول للمحل، للمكتب، وللسيارة التي تجوب شوارع بغداد.</p>
          </div>
          <Link className="text-link" href="/services">
            تعرّف على خدماتنا <ArrowLeft size={18} />
          </Link>
        </div>
        <div className="services-editorial">
          <figure className="service-feature">
            <Photo
              name="workshop"
              alt="طابعة عريضة تنتج فينيل بألوان برتقالية وخضراء داخل ورشة"
            />
            <figcaption>
              <span>من داخل الشغل.</span>
              <p>لون واضح. قص مضبوط. وتشطيب نظيف.</p>
            </figcaption>
          </figure>
          <div className="service-index">
            {services.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.slug}>
                <span>
                  {s.name}
                  <small>{s.uses.slice(0, 2).join(' · ')}</small>
                </span>
                <ArrowUpLeft size={23} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="featured-section section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>الفرق، تشوفه بالشغل.</h2>
              <p>تصورات لمشاريع محلية، من الواجهة إلى آخر تفصيلة.</p>
            </div>
            <Link className="text-link" href="/projects">
              كل الأعمال <ArrowLeft size={18} />
            </Link>
          </div>
          <div className="featured-grid">
            <ProjectCard project={projects[0]} large />
            <ProjectCard project={projects[2]} />
          </div>
          <p className="image-disclosure">
            أعمال توضيحية وصور مولّدة لعرض أساليب التنفيذ، وليست سجلًا لمشاريع عملاء
            فعليين.
          </p>
        </div>
      </section>
      <section className="wrap craft-section section">
        <div className="craft-title">
          <h2>
            التفاصيل الصغيرة،
            <br />
            هي اللي تفرّق.
          </h2>
          <p>
            المظهر الحلو يبدأ بقرار صحيح في الورشة. لذلك نرتّب أساسيات الشغل قبل
            ما نشغّل الطابعة.
          </p>
          <Link href="/about" className="text-link">
            تعرّف على المؤمل <ArrowLeft size={18} />
          </Link>
        </div>
        <div className="craft-list">
          {[
            {
              title: 'خامة تخدم استخدامك',
              text: 'شمس، ظل، رطوبة أو استخدام داخلي. نختار المادة بحسب المكان ومدة الاستخدام، ونشرح الفرق في السعر.',
            },
            {
              title: 'معاينة قبل الإنتاج',
              text: 'تراجع النصوص والمقاسات والتوزيع قبل الطباعة. وللألوان الحساسة نتفق على عينة مناسبة.',
            },
            {
              title: 'تنفيذ وتركيب محسوب',
              text: 'نراعي الحواف والوصلات ونقاط الكهرباء والتثبيت، ونوضح ما يشمله العمل من البداية.',
            },
          ].map((x) => (
            <div key={x.title}>
              <Check size={21} />
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="vehicle-showcase">
        <div className="vehicle-photo">
          <Photo
            name="van"
            alt="فان زاد التجاري بتغليف أخضر وبرتقالي، تصور لهوية مركبة في بغداد"
            sizes="(max-width:760px) 100vw, 60vw"
          />
        </div>
        <div className="vehicle-copy">
          <h2>
            بالشارع،
            <br />
            خلي اسمك حاضر.
          </h2>
          <p>
            سيارة توصيل أو فان شغل؟ نوزّع هويتك على خطوط المركبة، بخامة مناسبة
            وتفاصيل مقروءة بكل مشوار.
          </p>
          <Link className="text-link" href="/services/vehicle-wraps">
            استكشف تغليف السيارات <ArrowLeft size={19} />
          </Link>
          <span className="material-note">
            فينيل مطبوع · طبقة حماية · تركيب مدروس
          </span>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-heading">
          <div>
            <h2>من الفكرة، إلى مكانها.</h2>
            <p>أربع خطوات واضحة، تعرف خلالها وين وصل شغلك.</p>
          </div>
        </div>
        <Process />
      </section>
      <section className="materials-section section">
        <div className="wrap material-grid">
          <div>
            <h2>
              ورق، أكريليك، فينيل.
              <br />
              كل خامة إلها شغلها.
            </h2>
            <p>
              طباعة تحافظ على التفاصيل، وإضاءة تخدم الاسم، وتغليف يتناسب مع
              السطح. نقترح الخيارات بحسب مشروعك، مو وصفة واحدة للجميع.
            </p>
            <ul className="material-list">
              <li>
                <strong>للمطبوعات</strong>
                <span>كوشيه، فوتوغرافي وكانفاس، بتشطيبات مطفية أو لامعة.</span>
              </li>
              <li>
                <strong>للواجهات</strong>
                <span>أكريليك وألمنيوم مع إضاءة أمامية أو خلفية.</span>
              </li>
              <li>
                <strong>للتغليف</strong>
                <span>فينيل، فروست وطبقات حماية حسب الاستخدام.</span>
              </li>
            </ul>
            <Link href="/services/posters" className="text-link">
              تفاصيل الطباعة والتشطيب <ArrowLeft size={18} />
            </Link>
          </div>
          <figure>
            <Photo
              name="posters"
              alt="طبعات ورقية أصلية بتصاميم تستلهم الأقواس بألوان الحبر والورق"
            />
            <figcaption>الخامة جزء من النتيجة، مو تفصيلة ثانوية.</figcaption>
          </figure>
        </div>
      </section>
      <section className="wrap audience-section">
        <h2>
          شغلك مهما كان،
          <br />
          نلقى له طريقة يظهر.
        </h2>
        <p>
          مطاعم ومقاهٍ <span>/</span> محلات ومعارض <span>/</span> مكاتب وعيادات{' '}
          <span>/</span> شركات وخدمات توصيل <span>/</span> فعاليات ومشاريع ناشئة
        </p>
      </section>
      <section className="testimonials section">
        <div className="wrap">
          <div className="section-heading">
            <div>
              <h2>الكلام اللي نحب نسمعه.</h2>
              <p>آراء توضيحية لشخصيات ومشاريع افتراضية.</p>
            </div>
          </div>
          <div className="testimonial-grid">
            {[
              {
                quote:
                  'اللي فرق وياي إن تفاصيل الخامة والتركيب كانت واضحة من البداية. عرفت شنو أختار وليش.',
                name: 'أحمد — صاحب مقهى',
              },
              {
                quote:
                  'راجعنا توزيع الستيكر على الزجاج قبل التنفيذ، والنتيجة خلت الضوء يدخل والخصوصية أحسن.',
                name: 'نور — صاحبة متجر',
              },
              {
                quote:
                  'اسم المشروع واضح على الفان، والتصميم ما ضاع بين الأبواب والمقابض.',
                name: 'علي — مشروع توصيل',
              },
            ].map((t) => (
              <figure key={t.name}>
                <blockquote>«{t.quote}»</blockquote>
                <figcaption>{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap faq-section section">
        <div>
          <h2>
            قبل ما تسأل،
            <br />
            هذه أجوبة تفيدك.
          </h2>
          <p>عن الملفات والخامات ووقت التنفيذ.</p>
          <Link href="/faq" className="text-link">
            كل الأسئلة الشائعة <ArrowLeft size={18} />
          </Link>
        </div>
        <FAQ limit={4} />
      </section>
      <CTA />
    </main>
  );
}
