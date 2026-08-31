import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveSiteUrl } from '../lib/site-url.ts';

await test('custom domain takes precedence and canonical URLs use its origin', () => {
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: 'https://print.example/about/',
      VERCEL_PROJECT_PRODUCTION_URL: 'production.vercel.app',
    }),
    'https://print.example',
  );
});
await test('Vercel production domain stays canonical on previews', () => {
  assert.equal(
    resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: 'production.vercel.app',
      VERCEL_URL: 'preview.vercel.app',
    }),
    'https://production.vercel.app',
  );
});
await test('first deployment and local development have valid fallback URLs', () => {
  assert.equal(
    resolveSiteUrl({ VERCEL_URL: 'first.vercel.app' }),
    'https://first.vercel.app',
  );
  assert.equal(resolveSiteUrl({}), 'http://localhost:3000');
});
await test('invalid or credential-bearing public URLs fail clearly', () => {
  for (const value of [
    'invalid',
    'javascript:alert(1)',
    'https://user:secret@example.com',
  ]) {
    assert.throws(() => resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: value }));
  }
});
