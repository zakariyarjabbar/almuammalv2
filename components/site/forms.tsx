'use client';
import Link from 'next/link';
import { useRef, useState, useSyncExternalStore } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { normalize, inquirySchema as schema } from '@/lib/inquiry-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  Download,
  Copy,
  ArrowUpLeft,
  Upload,
  X,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { NativeSelect } from '@/components/ui/native-select';
import { services } from '@/lib/content';
type Values = z.infer<typeof schema>;
const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
function Field({
  label,
  id,
  error,
  children,
  help,
  full = false,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  help?: string;
  full?: boolean;
}) {
  return (
    <div className={`form-field ${full ? 'full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {help && (
        <p id={`${id}-help`} className="field-help">
          {help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
export function InquiryForm({
  contact = false,
  initialService = '',
}: {
  contact?: boolean;
  initialService?: string;
}) {
  const ready = useSyncExternalStore(
    subscribeHydration,
    clientReady,
    serverReady,
  );
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [summary, setSummary] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: contact ? 'general' : initialService,
      area: 'بغداد',
      method: 'whatsapp',
      consent: false,
      quantity: '',
      date: '',
      email: '',
    },
  });
  const method = watch('method');
  const props = (name: keyof Values) => ({
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });
  function selectFiles(list: FileList | null) {
    setFileError('');
    if (!list) return;
    const incoming = Array.from(list);
    const next = [...files, ...incoming];
    if (next.length > 3) {
      setFileError('يمكن إرفاق ثلاثة ملفات كحد أقصى. احذف ملفًا قبل الإضافة.');
      return;
    }
    for (const f of incoming) {
      if (
        !['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(
          f.type,
        ) ||
        !/\.(pdf|jpe?g|png|webp)$/i.test(f.name)
      ) {
        setFileError('صيغة غير مدعومة. اختر PDF أو JPG أو PNG أو WebP.');
        return;
      }
      if (f.size > 20 * 1024 * 1024 || f.size === 0) {
        setFileError('كل ملف يجب أن يكون غير فارغ وأقل من ٢٠ ميغابايت.');
        return;
      }
    }
    setFiles(next);
  }
  function submit(v: Values) {
    if (fileError) {
      fileRef.current?.focus();
      return;
    }
    const name =
      services.find((s) => s.slug === v.service)?.name ||
      (v.service === 'general' ? 'استفسار عام' : 'أحتاج مساعدة بالاختيار');
    const content = [
      contact ? 'ملخص استفسار — المؤمل' : 'ملخص طلب عرض سعر — المؤمل',
      'هذا ملخص محلي تجريبي. لم يُرسل إلى أي جهة.',
      '',
      `الاسم: ${v.name}`,
      `الهاتف: ${normalize(v.phone)}`,
      `المشروع: ${v.company || 'غير محدد'}`,
      `الخدمة: ${name}`,
      `المنطقة: ${v.area}`,
      `المقاسات: ${v.dimensions || 'تحتاج معاينة'}`,
      `الكمية: ${v.quantity || 'تحدد لاحقًا'}`,
      `الموعد المرغوب: ${v.date || 'مرن'}`,
      `التواصل المفضل: ${{ phone: 'اتصال', whatsapp: 'واتساب', email: 'بريد إلكتروني' }[v.method]}`,
      v.email ? `البريد: ${v.email}` : '',
      'التفاصيل:',
      v.details,
      '',
      `الملفات المختارة محليًا (لم تُرفع): ${files.length ? files.map((f) => f.name).join('، ') : 'لا يوجد'}`,
    ]
      .filter(Boolean)
      .join('\n');
    setSummary(content);
    setTimeout(() => resultRef.current?.focus(), 0);
  }
  function download() {
    const blob = new Blob(['\uFEFF' + summary], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = contact ? 'almoammal-inquiry.txt' : 'almoammal-quote.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setCopyStatus(
      'طُلب تنزيل الملخص. إذا منع المتصفح التنزيل، يمكنك نسخه أو مراجعة محتواه أدناه.',
    );
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopyStatus('نُسخ الملخص.');
    } catch {
      setCopyStatus(
        'تعذر النسخ من المتصفح. استخدم «تنزيل الملخص» أو حدّد النص أدناه.',
      );
    }
  }
  if (summary)
    return (
      <div className="form-success" tabIndex={-1} ref={resultRef}>
        <span className="success-mark">
          <Check size={32} />
        </span>
        <h2>
          ملخصك جاهز.
          <br />
          ولم يُرسل لأي جهة.
        </h2>
        <p>
          جهّزنا المعلومات التي أدخلتها على جهازك فقط. لم يُحجز موعد ولم يُرفع أي
          ملف. يمكنك حفظ الملخص أو تعديله.
        </p>
        <div className="actions">
          <Button className="btn" onClick={download}>
            <Download size={18} />
            تنزيل الملخص
          </Button>
          <Button variant="outline" className="btn outline" onClick={copy}>
            <Copy size={18} />
            نسخ الملخص
          </Button>
        </div>
        <output className="copy-status">{copyStatus}</output>
        <details className="summary-details">
          <summary>مراجعة محتوى الملخص</summary>
          <pre>{summary}</pre>
        </details>
        <div className="success-links">
          <Button variant="ghost" onClick={() => setSummary('')}>
            تعديل البيانات
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setSummary('');
              reset();
              setFiles([]);
              setFileError('');
              setCopyStatus('');
            }}
          >
            <RotateCcw size={16} />
            بدء طلب جديد
          </Button>
          <Link href="/projects">استكشف الأعمال</Link>
        </div>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={handleSubmit(submit)} noValidate>
      <noscript>
        <p className="form-notice">
          فعّل جافاسكربت لاستخدام النموذج المحلي. الإرسال التقليدي معطّل لحماية
          بياناتك.
        </p>
      </noscript>
      <div className="form-notice">
        <strong>تجربة محلية، بدون إرسال.</strong>
        <p>
          البيانات تبقى في هذه الصفحة، والملفات لا تُرفع. استخدم معلومات تجريبية؛
          سيُجهّز لك ملخص قابل للتنزيل.
        </p>
      </div>
      {submitCount > 0 && Object.keys(errors).length > 0 && (
        <p className="error-summary" role="alert">
          راجع الحقول المعلّمة أدناه. لم يتم تجهيز الملخص بعد.
        </p>
      )}
      <fieldset disabled={!ready}>
        <legend>تفاصيل التواصل</legend>
        <div className="form-grid">
          <Field id="name" label="الاسم *" error={errors.name?.message}>
            <Input
              id="name"
              autoComplete="name"
              {...register('name')}
              {...props('name')}
            />
          </Field>
          <Field
            id="phone"
            label="رقم الموبايل *"
            error={errors.phone?.message}
            help="يبدأ بـ 07 أو +964. الأرقام العربية مقبولة."
          >
            <Input
              id="phone"
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              {...register('phone')}
              {...props('phone')}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
            />
          </Field>
          <Field
            id="company"
            label="اسم المشروع أو الشركة"
            error={errors.company?.message}
          >
            <Input
              id="company"
              autoComplete="organization"
              {...register('company')}
              {...props('company')}
            />
          </Field>
          <Field
            id="area"
            label="المحافظة / المنطقة *"
            error={errors.area?.message}
          >
            <Input
              id="area"
              autoComplete="address-level2"
              {...register('area')}
              {...props('area')}
            />
          </Field>
        </div>
      </fieldset>
      <fieldset disabled={!ready}>
        <legend>{contact ? 'بماذا نقدر نساعدك؟' : 'احچِ لنا عن المشروع'}</legend>
        <div className="form-grid">
          <Field
            id="service"
            label="نوع الخدمة *"
            error={errors.service?.message}
            full
          >
            <NativeSelect
              id="service"
              {...register('service')}
              {...props('service')}
            >
              <option value="">اختر الخدمة</option>
              {services.map((s) => (
                <option value={s.slug} key={s.slug}>
                  {s.name}
                </option>
              ))}
              <option value="unsure">أحتاج مساعدة بالاختيار</option>
              {contact && <option value="general">استفسار عام</option>}
            </NativeSelect>
          </Field>
          <Field
            id="details"
            label={contact ? 'رسالتك *' : 'تفاصيل المشروع *'}
            error={errors.details?.message}
            full
            help="وضح الاستخدام ومكان التركيب والخامة إن كنت تعرفها."
          >
            <Textarea
              id="details"
              rows={5}
              maxLength={3000}
              {...register('details')}
              {...props('details')}
              aria-describedby={
                errors.details ? 'details-error' : 'details-help'
              }
            />
          </Field>
          {!contact && (
            <>
              <Field
                id="dimensions"
                label="المقاسات التقريبية"
                help="اكتب العرض × الارتفاع، مع الوحدة: سم أو متر."
              >
                <Input id="dimensions" {...register('dimensions')} />
              </Field>
              <Field
                id="quantity"
                label="الكمية"
                error={errors.quantity?.message}
              >
                <Input
                  id="quantity"
                  inputMode="numeric"
                  {...register('quantity')}
                  {...props('quantity')}
                />
              </Field>
              <Field
                id="date"
                label="موعد التنفيذ المطلوب"
                error={errors.date?.message}
                help="موعد مفضّل، ولا يمثل حجزًا مؤكدًا."
              >
                <Input
                  id="date"
                  type="date"
                  min={new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Baghdad',
                  }).format(new Date())}
                  {...register('date')}
                  {...props('date')}
                />
              </Field>
            </>
          )}
        </div>
      </fieldset>
      {!contact && (
        <fieldset disabled={!ready}>
          <legend>صور أو ملفات مرجعية</legend>
          <div className="upload-zone">
            <Upload size={26} aria-hidden="true" />
            <label htmlFor="files">اختيار ملفات من جهازك</label>
            <p id="files-help">
              PDF، JPG، PNG، WebP · حتى ٣ ملفات، ٢٠ ميغابايت لكل ملف.
              <br />
              للاختيار والمعاينة المحلية فقط، لا يتم رفعها أو حفظها.
            </p>
            <input
              ref={fileRef}
              id="files"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              aria-describedby={fileError ? 'files-error' : 'files-help'}
              onChange={(e) => {
                selectFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </div>
          {fileError && (
            <p id="files-error" className="field-error" role="alert">
              {fileError}
              <Button variant="ghost" onClick={() => setFileError('')}>
                متابعة دون هذا الملف
              </Button>
            </p>
          )}
          {files.length > 0 && (
            <ul className="file-list">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span dir="auto">
                    {f.name}
                    <small>{(f.size / 1024 / 1024).toFixed(1)} MB</small>
                  </span>
                  <Button
                    variant="ghost"
                    aria-label={`إزالة ${f.name}`}
                    onClick={() => {
                      setFiles(files.filter((_, j) => j !== i));
                      setFileError('');
                    }}
                  >
                    <X size={17} />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </fieldset>
      )}
      <fieldset disabled={!ready}>
        <legend>طريقة التواصل المفضّلة</legend>
        <div className="form-grid">
          <Field id="method" label="أفضل طريقة *">
            <NativeSelect id="method" {...register('method')}>
              <option value="whatsapp">واتساب</option>
              <option value="phone">اتصال هاتفي</option>
              <option value="email">البريد الإلكتروني</option>
            </NativeSelect>
          </Field>
          {method === 'email' && (
            <Field
              id="email"
              label="البريد الإلكتروني *"
              error={errors.email?.message}
            >
              <Input
                id="email"
                type="email"
                autoComplete="email"
                dir="ltr"
                {...register('email')}
                {...props('email')}
              />
            </Field>
          )}
        </div>
      </fieldset>
      <label className="consent-check">
        <input
          type="checkbox"
          {...register('consent')}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <span>
          قرأت{' '}
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">
            سياسة الخصوصية (تفتح في تبويب جديد)
          </Link>{' '}
          وأفهم أن هذه تجربة محلية لا تُرسل بياناتي. *
        </span>
      </label>
      {errors.consent && (
        <p id="consent-error" className="field-error" role="alert">
          {errors.consent.message}
        </p>
      )}
      <Button
        className="btn form-submit"
        type="submit"
        disabled={isSubmitting || !ready}
      >
        {isSubmitting
          ? 'جارٍ تجهيز الملخص…'
          : contact
            ? 'تجهيز ملخص الاستفسار'
            : 'تجهيز طلب عرض السعر'}
        <ArrowUpLeft size={20} />
      </Button>
      <p className="small-copy">
        الحقول المعلّمة بـ * مطلوبة. لا يوجد دفع أو التزام مالي.
      </p>
    </form>
  );
}
