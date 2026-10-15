import { metaTags } from './seo.js';

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

export function applyMeta(meta) {
  document.title = meta.title;
  const { url, tags } = metaTags(meta);

  for (const tag of tags) {
    const [attr, key] = tag.name ? ['name', tag.name] : ['property', tag.property];
    const selector = `meta[${attr}="${key}"]`;
    if (tag.content == null) {
      document.head.querySelector(selector)?.remove();
      continue;
    }
    const el = upsert(selector, () => {
      const m = document.createElement('meta');
      m.setAttribute(attr, key);
      return m;
    });
    el.setAttribute('content', tag.content);
  }

  if (url) {
    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.rel = 'canonical';
      return l;
    }).href = url;
  } else {
    document.head.querySelector('link[rel="canonical"]')?.remove();
  }

  const ldSelector = 'script[type="application/ld+json"]';
  if (meta.jsonLd) {
    upsert(ldSelector, () => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      return s;
    }).textContent = JSON.stringify(meta.jsonLd);
  } else {
    document.head.querySelector(ldSelector)?.remove();
  }
}
