import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { services, projects } from '../lib/content.ts';
import { resolveSiteUrl } from '../lib/site-url.ts';

// Exercise the real Next.js production server, including 404s and static assets.
const port = process.env.SMOKE_PORT || '3100';
const base = `http://127.0.0.1:${port}`;
const origin = resolveSiteUrl(process.env);
const server = spawn(
  process.execPath,
  [
    'node_modules/next/dist/bin/next',
    'start',
    '--hostname',
    '127.0.0.1',
    '--port',
    port,
  ],
  {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);
let log = '';
server.stdout.on('data', (chunk) => {
  log += chunk;
});
server.stderr.on('data', (chunk) => {
  log += chunk;
});
const routes = [
  '/',
  '/about',
  '/services',
  '/projects',
  '/quote',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/cookies',
  ...services.map(({ slug }) => `/services/${slug}`),
  ...projects.map(({ slug }) => `/projects/${slug}`),
];
const attribute = (tag, name) =>
  tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(([tag]) => tag);
const pages = new Map();
const assets = new Set([
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/og.png',
  '/site.webmanifest',
]);
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null)
      throw new Error(`Production server exited: ${log}`);
    try {
      if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) {
        ready = true;
        break;
      }
    } catch {
      /* Retry until the production server is ready. */
    }
    await delay(200);
  }
  assert.ok(ready, `Production server did not start: ${log}`);
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.equal(
      response.headers.get('x-content-type-options'),
      'nosniff',
      route,
    );
    const html = await response.text();
    assert.match(html, /<html[^>]*lang="ar"[^>]*dir="rtl"/, route);
    assert.equal(tags(html, 'h1').length, 1, `${route}: single H1`);
    assert.ok(
      tags(html, 'meta').some(
        (tag) =>
          attribute(tag, 'name') === 'description' && attribute(tag, 'content'),
      ),
      `${route}: description`,
    );
    const canonical = tags(html, 'link').find(
      (tag) => attribute(tag, 'rel') === 'canonical',
    );
    const expectedCanonical =
      route === '/' ? origin : new URL(route, origin).href;
    assert.equal(
      attribute(canonical || '', 'href'),
      expectedCanonical,
      `${route}: canonical`,
    );
    for (const image of tags(html, 'img')) {
      const src = attribute(image, 'src');
      if (src?.startsWith('/')) assets.add(src);
      for (const part of (
        attribute(image, 'srcSet') ||
        attribute(image, 'srcset') ||
        ''
      ).split(',')) {
        const srcset = part.trim().split(/\s+/)[0];
        if (srcset?.startsWith('/')) assets.add(srcset);
      }
    }
    pages.set(route, html);
  }
  for (const [route, html] of pages) {
    for (const link of tags(html, 'a')) {
      const href = attribute(link, 'href');
      if (!href?.startsWith('/') && !href?.startsWith('#')) continue;
      const url = new URL(href.replaceAll('&amp;', '&'), base + route);
      assert.ok(pages.has(url.pathname), `${route}: internal link ${href}`);
      if (url.hash)
        assert.ok(
          pages
            .get(url.pathname)
            .includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `${route}: anchor ${href}`,
        );
    }
  }
  for (const asset of assets) {
    assert.equal((await fetch(base + asset)).status, 200, `asset: ${asset}`);
  }
  for (const route of [
    '/missing-page',
    '/services/missing',
    '/projects/missing',
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 404, route);
    assert.match(await response.text(), /هذه الصفحة/, route);
  }
  for (const [route, text] of [
    ['/sitemap.xml', origin],
    ['/robots.txt', 'Sitemap:'],
  ]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    assert.ok((await response.text()).includes(text), route);
  }
  const quote = await fetch(base + '/quote?service=vehicle-wraps');
  assert.equal(quote.status, 200, 'quote query route');
  assert.match(
    await quote.text(),
    /value="vehicle-wraps"/,
    'quote service option',
  );
  console.log(
    `Passed: ${pages.size} pages, ${assets.size} assets, internal links, metadata, security headers, 404s and quote query route.`,
  );
} catch (error) {
  console.error(log);
  throw error;
} finally {
  server.kill('SIGTERM');
}
