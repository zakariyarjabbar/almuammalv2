import { z } from 'zod';
export const normalizeDigits = (v: string) =>
  v
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));
export const normalize = (v: string) =>
  normalizeDigits(v).replace(/[\s()-]/g, '');
export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'اكتب اسمًا من حرفين على الأقل.')
      .max(80, 'الاسم طويل؛ اكتبه بأقل من ٨٠ حرفًا.'),
    phone: z
      .string()
      .refine(
        (v) => /^(?:07\d{9}|\+?9647\d{9})$/.test(normalize(v)),
        'اكتب رقم موبايل عراقي من ١١ رقمًا يبدأ بـ 07، أو مع +964.',
      ),
    company: z.string().max(120, 'اكتب اسمًا أقصر من ١٢٠ حرفًا.').optional(),
    service: z.string().min(1, 'اختر الخدمة، أو اختر «أحتاج مساعدة بالاختيار».'),
    details: z
      .string()
      .trim()
      .min(15, 'وضّح الفكرة في ١٥ حرفًا على الأقل حتى يكون الملخص مفيدًا.')
      .max(3000, 'اختصر التفاصيل إلى ٣٠٠٠ حرف أو أقل.'),
    dimensions: z
      .string()
      .max(100, 'اختصر المقاسات إلى ١٠٠ حرف أو أقل.')
      .optional(),
    quantity: z
      .string()
      .optional()
      .refine(
        (v) =>
          !v ||
          (/^\d+$/.test(normalizeDigits(v)) &&
            Number(normalizeDigits(v)) >= 1 &&
            Number(normalizeDigits(v)) <= 100000),
        'اكتب كمية صحيحة بين ١ و١٠٠٬٠٠٠.',
      ),
    area: z
      .string()
      .trim()
      .min(2, 'اكتب المحافظة والمنطقة.')
      .max(120, 'اختصر المنطقة إلى ١٢٠ حرفًا أو أقل.'),
    date: z
      .string()
      .optional()
      .refine(
        (v) =>
          !v ||
          (z.iso.date().safeParse(v).success &&
            v >=
              new Intl.DateTimeFormat('en-CA', {
                timeZone: 'Asia/Baghdad',
              }).format(new Date())),
        'اختر تاريخ اليوم أو موعدًا قادمًا.',
      ),
    method: z.enum(['phone', 'whatsapp', 'email']),
    email: z
      .string()
      .optional()
      .refine(
        (v) => !v || z.email().safeParse(v).success,
        'اكتب بريدًا إلكترونيًا صحيحًا.',
      ),
    consent: z
      .boolean()
      .refine((v) => v, 'أكد أنك قرأت تنبيه التجربة وسياسة الخصوصية.'),
  })
  .refine((v) => v.method !== 'email' || !!v.email, {
    path: ['email'],
    message: 'أضف بريدك لأنك اخترت التواصل بالبريد.',
  });
