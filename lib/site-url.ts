type SiteEnvironment = {
  NEXT_PUBLIC_SITE_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  VERCEL_URL?: string;
};

/** Prefer the stable production domain, including when building preview branches. */
export function resolveSiteUrl(env: SiteEnvironment): string {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelHost =
    env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || env.VERCEL_URL?.trim();
  const value =
    configured ||
    (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000');
  const url = new URL(value);
  if (
    !['https:', 'http:'].includes(url.protocol) ||
    url.username ||
    url.password
  ) {
    throw new Error(
      'NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL without credentials.',
    );
  }
  return url.origin;
}

export const siteUrl = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});
