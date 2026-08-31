import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
export default function NotFound() {
  return (
    <main id="main" className="wrap not-found">
      <span className="error-number" aria-hidden="true">
        ٤٠٤
      </span>
      <div>
        <h1>
          هذه الصفحة
          <br />
          مو ضمن الشغل.
        </h1>
        <p>
          يمكن الرابط تغيّر أو كُتب بشكل غير صحيح.
          <br />
          خلّ نرجعك لمكان تلقى بيه اللي تحتاجه.
        </p>
        <div className="actions">
          <Link href="/" className="btn">
            الصفحة الرئيسية <ArrowUpLeft size={18} />
          </Link>
          <Link href="/services" className="text-link">
            استكشف الخدمات <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
