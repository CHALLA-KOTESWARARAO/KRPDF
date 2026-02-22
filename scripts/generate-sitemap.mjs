import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES } from '../src/seo/routes.js';
import { SITE_URL } from '../src/seo/defaultSeo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = resolve(__dirname, '../public');
const sitemapPath = resolve(publicDir, 'sitemap.xml');

const now = new Date().toISOString().split('T')[0];
const normalizedSiteUrl = SITE_URL.replace(/\/$/, '');

const urlEntries = ROUTES.map((route) => {
  const loc = `${normalizedSiteUrl}${route.path}`;
  const priority = route.priority || '0.7';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Sitemap generated at ${sitemapPath}`);
