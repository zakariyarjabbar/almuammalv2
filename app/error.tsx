'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="wrap error-page">
      <h1>صار خلل أثناء تحميل الصفحة.</h1>
      <p>
        أعد المحاولة. إذا استمر الخلل، تستطيع الرجوع إلى الرئيسية. لن نعتبر أي
        طلب مرسلًا بسبب هذا الخطأ.
      </p>
      <div className="actions">
        <Button className="btn" onClick={() => reset()}>
          إعادة المحاولة
        </Button>
        <Link href="/" className="text-link">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
