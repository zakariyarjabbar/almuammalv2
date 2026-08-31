'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowUpLeft,
  Menu,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Camera,
  Globe,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { business, nav } from '@/lib/site';
import { services } from '@/lib/content';
export function Wordmark() {
  return (
    <Link className="wordmark" href="/" aria-label="المؤمل، الصفحة الرئيسية">
      المؤمل<small>للدعاية والإعلان</small>
    </Link>
  );
}
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        انتقل إلى المحتوى
      </a>
      <div className="topstrip">
        <span>من بغداد، لكل مشروع يريد أن يُرى.</span>
        <span>
          <MapPin size={13} aria-hidden="true" /> بغداد · الكرادة
        </span>
      </div>
      <header className="header-outer">
        <div className="header wrap">
          <Wordmark />
          <nav aria-label="القائمة الرئيسية">
            {nav.map((n) => (
              <Link
                href={n.href}
                key={n.href}
                aria-current={path === n.href ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="btn small" href="/quote">
              اطلب عرض سعر <ArrowUpLeft size={18} aria-hidden="true" />
            </Link>
            <Dialog open={open} onOpenChange={setOpen}>
              <Button
                variant="ghost"
                className="menu-button"
                aria-label="فتح القائمة"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                <Menu size={24} />
              </Button>
              <DialogContent className="mobile-dialog" showCloseButton={false}>
                <DialogTitle className="dialog-heading">القائمة</DialogTitle>
                <DialogDescription>
                  خدمات المؤمل وأعمالها وطرق التواصل
                </DialogDescription>
                <DialogClose
                  render={
                    <Button
                      variant="ghost"
                      className="dialog-x"
                      aria-label="إغلاق القائمة"
                    />
                  }
                >
                  <X />
                </DialogClose>
                <nav className="mobile-nav" aria-label="قائمة الهاتف">
                  {nav.map((n) => (
                    <Link
                      href={n.href}
                      key={n.href}
                      onClick={() => setOpen(false)}
                      aria-current={path === n.href ? 'page' : undefined}
                    >
                      {n.label}
                      <ArrowUpLeft size={20} />
                    </Link>
                  ))}
                  <Link href="/faq" onClick={() => setOpen(false)}>
                    الأسئلة الشائعة
                    <ArrowUpLeft size={20} />
                  </Link>
                </nav>
                <Link
                  href="/quote"
                  className="btn"
                  onClick={() => setOpen(false)}
                >
                  اطلب عرض سعر
                </Link>
                <p className="small-copy">{business.address}</p>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>
    </>
  );
}
type Kind = 'phone' | 'whatsapp' | 'email' | 'instagram' | 'facebook';
const contactData = {
  phone: { href: `tel:${business.phone}`, label: 'اتصل بنا', Icon: Phone },
  whatsapp: {
    href: `https://wa.me/${business.whatsapp}`,
    label: 'واتساب',
    Icon: MessageCircle,
  },
  email: {
    href: `mailto:${business.email}`,
    label: 'البريد الإلكتروني',
    Icon: Mail,
  },
  instagram: { href: business.instagram, label: 'إنستغرام', Icon: Camera },
  facebook: { href: business.facebook, label: 'فيسبوك', Icon: Globe },
};
export function ContactLink({
  kind,
  className = '',
  children,
  icon = true,
}: {
  kind: Kind;
  className?: string;
  children?: React.ReactNode;
  icon?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const item = contactData[kind];
  return (
    <>
      <a
        className={`contact-link ${className}`}
        href={business.isMock ? '/contact#mock-contact' : item.href}
        onClick={(e) => {
          if (business.isMock) {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {icon && <item.Icon size={18} aria-hidden="true" />}
        {children || item.label}
      </a>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="brand-dialog" showCloseButton={false}>
          <DialogTitle className="dialog-heading">
            بيانات توضيحية، لسلامة تواصلك
          </DialogTitle>
          <DialogDescription className="dialog-copy">
            المؤمل شركة افتراضية في هذا العرض. رقم الهاتف والبريد وحسابات
            التواصل أمثلة غير موثّقة؛ لذلك لن نفتح اتصالًا أو نرسلك إلى حساب قد يخص
            جهة أخرى.
          </DialogDescription>
          <p>تستطيع تجربة تجهيز طلبك داخل الموقع. لن يُرسل إلى أي جهة.</p>
          <Link href="/quote" className="btn" onClick={() => setOpen(false)}>
            جرّب طلب عرض السعر <ArrowUpLeft size={18} />
          </Link>
          <DialogClose
            render={<Button variant="outline" className="btn outline" />}
          >
            رجوع
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Wordmark />
          <p>
            طباعة وإعلانات تليق باسمك.
            <br />
            من اختيار الخامة إلى آخر لمسة تركيب.
          </p>
          <div className="socials">
            <ContactLink kind="instagram" />
            <ContactLink kind="facebook" />
          </div>
        </div>
        <div>
          <h2>تعرّف علينا</h2>
          <ul>
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/quote">اطلب عرض سعر</Link>
            </li>
            <li>
              <Link href="/faq">الأسئلة الشائعة</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>خدماتنا</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-contact">
          <h2>نلتقي في بغداد</h2>
          <p>{business.address}</p>
          <ContactLink kind="phone">
            <bdi>{business.phoneDisplay}</bdi>
          </ContactLink>
          <ContactLink kind="email">
            <bdi>{business.email}</bdi>
          </ContactLink>
          <p className="hours">
            {business.hours}
            <br />
            {business.closed}
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© ٢٠٢٦ المؤمل. جميع الحقوق محفوظة.</p>
        <div>
          <Link href="/privacy">الخصوصية</Link>
          <Link href="/terms">الشروط والأحكام</Link>
          <Link href="/cookies">ملفات الارتباط</Link>
          <button
            onClick={() => window.dispatchEvent(new Event('cookie-settings'))}
          >
            إعدادات الخصوصية
          </button>
        </div>
      </div>
      <p className="mock-disclosure wrap">
        عرض توضيحي لشركة افتراضية. بيانات التواصل والأعمال وآراء العملاء أمثلة،
        والصور مولّدة خصيصًا للموقع.
      </p>
    </footer>
  );
}
type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string;
};
export function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [storageError, setStorageError] = useState(false);
  // Preferences are synchronized once from browser storage after SSR; no request data is persisted.
  /* eslint-disable react/react-compiler -- Synchronize device-local preferences after server rendering. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem('almoammal-consent-v1');
      if (raw) {
        const value = JSON.parse(raw) as Consent;
        setAnalytics(!!value.analytics);
        setMarketing(!!value.marketing);
      } else setBanner(true);
    } catch {
      setBanner(true);
    }
    const show = () => setSettings(true);
    window.addEventListener('cookie-settings', show);
    return () => window.removeEventListener('cookie-settings', show);
  }, []);
  function save(a: boolean, m: boolean) {
    setStorageError(false);
    setAnalytics(a);
    setMarketing(m);
    try {
      localStorage.setItem(
        'almoammal-consent-v1',
        JSON.stringify({
          necessary: true,
          analytics: a,
          marketing: m,
          date: new Date().toISOString(),
        }),
      );
    } catch {
      setStorageError(true);
    }
    setBanner(false);
    setSettings(false);
  }
  return (
    <>
      {banner && (
        <section className="cookie-banner" aria-label="تفضيلات الخصوصية">
          <div>
            <strong>خصوصيتك على راحتك.</strong>
            <p>
              نحفظ تفضيلاتك على هذا الجهاز. لا نشغّل أدوات تحليلات أو تسويق في هذه
              النسخة.
            </p>
          </div>
          <div className="cookie-actions">
            <Button className="btn small" onClick={() => save(false, false)}>
              الضرورية فقط
            </Button>
            <Button
              variant="outline"
              className="btn small outline"
              onClick={() => setSettings(true)}
            >
              تخصيص
            </Button>
          </div>
        </section>
      )}
      {storageError && (
        <output className="storage-notice">
          طبّقنا اختيارك لهذه الزيارة، لكن المتصفح منع حفظه. قد يظهر التنبيه عند
          العودة.
          <Button
            variant="ghost"
            aria-label="إغلاق التنبيه"
            onClick={() => setStorageError(false)}
          >
            <X size={16} />
          </Button>
        </output>
      )}
      <Dialog open={settings} onOpenChange={setSettings}>
        <DialogContent className="brand-dialog" showCloseButton={false}>
          <DialogTitle className="dialog-heading">إعدادات الخصوصية</DialogTitle>
          <DialogDescription>
            يمكنك تغيير موافقتك في أي وقت. الخيارات الاختيارية لا تفعّل أي خدمات في
            النسخة الحالية.
          </DialogDescription>
          <div className="consent-row">
            <div>
              <strong>ضرورية</strong>
              <p>تذكّر تفضيلات الخصوصية وتشغيل الواجهة.</p>
            </div>
            <span>مفعّلة دائمًا</span>
          </div>
          <label
            className="consent-row"
            htmlFor="analytics-consent"
            aria-label="السماح بالتحليلات"
          >
            <div>
              <strong>تحليلات</strong>
              <p>لقياس الاستخدام عند ربط أداة مستقبلًا.</p>
            </div>
            <input
              id="analytics-consent"
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
          </label>
          <label
            className="consent-row"
            htmlFor="marketing-consent"
            aria-label="السماح بالتسويق"
          >
            <div>
              <strong>تسويق</strong>
              <p>لحملات إعلانية عند تفعيلها وموافقتك.</p>
            </div>
            <input
              id="marketing-consent"
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
          </label>
          <div className="actions compact">
            <Button className="btn" onClick={() => save(analytics, marketing)}>
              حفظ اختياراتي
            </Button>
            <Button
              variant="outline"
              className="btn outline"
              onClick={() => save(false, false)}
            >
              رفض الاختيارية
            </Button>
          </div>
          <div className="dialog-links">
            <Link href="/cookies" onClick={() => setSettings(false)}>
              اقرأ سياسة ملفات الارتباط
            </Link>
            <DialogClose render={<Button variant="ghost" />}>إغلاق</DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
