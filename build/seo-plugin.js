// Writes a copy of index.html per indexable route with route-specific <head>
// tags (so crawlers and link previews see the right title/canonical without
// running JS), plus 404.html and sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { routes, notFoundMeta, metaTags, SITE_URL } from '../src/seo.js';

const START = '<!-- seo:start -->';
const END = '<!-- seo:end -->';

const escape = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function renderHead(meta) {
  const { url, tags } = metaTags(meta);
  const lines = [`<title>${escape(meta.title)}</title>`];
  for (const tag of tags) {
    if (tag.content == null) continue;
    const attr = tag.name ? `name="${tag.name}"` : `property="${tag.property}"`;
    lines.push(`<meta ${attr} content="${escape(tag.content)}" />`);
  }
  if (url) lines.push(`<link rel="canonical" href="${url}" />`);
  if (meta.jsonLd) {
    // Escape '<' so post content can never close the script tag.
    lines.push(`<script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`);
  }
  return `${START}\n    ${lines.join('\n    ')}\n    ${END}`;
}

function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map((route) => {
    const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
    const lastmod = route.publishedTime || today;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

export default function seoPlugin() {
  let outDir;
  return {
    name: 'portfolio-seo',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    writeBundle() {
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');
      const pattern = new RegExp(`${START}[\\s\\S]*?${END}`);
      if (!pattern.test(template)) {
        throw new Error('[portfolio-seo] index.html is missing the seo:start/seo:end markers');
      }
      const render = (meta) => template.replace(pattern, renderHead(meta));

      for (const route of routes) {
        const file = route.path === '/' ? 'index.html' : join(route.path.slice(1), 'index.html');
        mkdirSync(dirname(join(outDir, file)), { recursive: true });
        writeFileSync(join(outDir, file), render(route));
      }
      writeFileSync(join(outDir, '404.html'), render(notFoundMeta));
      writeFileSync(join(outDir, 'sitemap.xml'), renderSitemap());
    }
  };
}
