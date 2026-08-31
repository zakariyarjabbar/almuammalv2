# المؤمل — Almuammal

A complete Arabic RTL website for a fictional Baghdad printing and signage business. The accepted design, Arabic copy, original imagery, portfolio and local quote workflow are preserved.

**Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Node.js 22**

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import `zakariyarjabbar/almuammalv2`.
2. Use branch **main**, root directory **./**, framework **Next.js**, Node.js **22.x**.
3. Leave the output directory at its Next.js default. `vercel.json` selects `npm ci` and `npm run build`.
4. Click **Deploy**. No API keys, database, Cloudflare bindings or environment variables are required.

Vercel supplies the production domain automatically. When attaching a custom domain, set `NEXT_PUBLIC_SITE_URL` to its full HTTPS origin and redeploy. It controls canonical URLs, sitemap, structured data and social images. Preview deployments are marked `noindex`; they retain the stable production canonical domain. See `.env.example`.

This is a normal Next.js deployment, not a static HTML export. The quote page reads a service from the query string on the server. Do not set the output directory to `public`, `dist` or `out`.

[Vercel’s Next.js deployment documentation](https://vercel.com/docs/frameworks/full-stack/nextjs)

## Local development

```sh
nvm use
npm ci
npm run dev
```

Open `http://localhost:3000`.

```sh
npm run check        # lint, types, unit tests and production build
npm run test:smoke   # real production-server route/asset/metadata checks
npm run start       # serve the existing production build
```

GitHub Actions runs formatting, lint, type checks, tests, a production build and the HTTP smoke suite on pushes and pull requests. Tests need no account, secrets or external services.

## Pages and features

- 23 content pages: homepage, company, services, seven service details, projects, six project details, quotation, contact, FAQ and three policies.
- Custom 404/error states, keyboard-accessible menus/dialogs, portfolio filtering, image zoom, cookie preferences and reduced-motion styles.
- Arabic and international Iraqi phone-number validation, conditional email validation, local file selection and editable inquiry summaries.
- Local responsive WebP photography, self-hosted Arabic fonts, favicon, manifest, sitemap, page metadata, Open Graph and structured data.

## Important: demonstration mode

The company data, projects and testimonials are fictional and labeled accordingly. Contact buttons deliberately show an explanation instead of calling unverified phone numbers or accounts.

**The quote and contact forms do not send messages or upload files.** They validate on the device and prepare a local summary to copy or download. There is no payment, analytics, tracking pixel or customer database. Browser download policies may affect saving a file; copying and reviewing the summary remain available.

Keep `business.isMock` enabled in `lib/site.ts` until contact data is verified. Replacing company data does not connect a backend. To receive real inquiries, add server-side validation, rate limits, secure file processing and a documented retention policy, then update the forms and legal copy. Do not change the success message to “sent” without a confirmed server response.

## Source map

| Location                      | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `app/`                        | Pages, layout, metadata, policies and error handling |
| `components/site/`            | Site UI, forms and interactions                      |
| `components/ui/`              | Reused accessible Base UI/shadcn primitives          |
| `lib/content.ts`              | Arabic service, project and FAQ content              |
| `lib/site.ts`                 | Fictional business/contact configuration             |
| `lib/site-url.ts`             | Deployment-domain resolution                         |
| `lib/legal.ts`                | Arabic policies describing current behavior          |
| `public/images/`              | Responsive generated photographs                     |
| `tests/`, `scripts/smoke.mjs` | Validation and production-route regression checks    |
| `docs/`                       | QA notes, image provenance and font licenses         |

Images were generated specifically for this project; they do not document real client work. Included fonts retain their respective licenses in `docs/`. No new open-source license is granted to the entire website by this repository.

## ملحوظة تشغيلية

التصميم والمحتوى العربي مكتملان. النسخة الحالية توضيحية وصريحة بشأن بياناتها الافتراضية. النشر على Vercel لا يحوّل النماذج إلى استقبال حقيقي للطلبات؛ تجهيز الاستقبال الفعلي يحتاج ربط خدمة آمنة وتحديث السياسات بما يطابقها.
