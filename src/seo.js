// Route metadata shared by the client (head updates on navigation) and the
// build (prerendered <head> per route, sitemap.xml). Keep this file free of
// browser APIs and '@/' aliases so vite.config.js can import it.
import { posts } from './data/blog.js';

export const SITE_URL = 'https://website-five-psi-78.vercel.app';
export const SITE_NAME = 'Avotra Niaina Rakotoson';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

const START_YEAR = 2017;
const years = new Date().getFullYear() - START_YEAR;

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  jobTitle: 'Senior Software Engineer',
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: 'mailto:navotra.rakotoson@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Antananarivo',
    addressCountry: 'MG'
  },
  sameAs: [
    'https://github.com/rakotoson',
    'https://www.linkedin.com/in/avotra-niaina-rakotoson-763a52165/'
  ],
  knowsAbout: ['JavaScript', 'TypeScript', 'Node.js', 'Vue.js', 'Angular', 'NestJS', 'PostgreSQL', 'Docker']
};

const homeMeta = {
  path: '/',
  title: `${SITE_NAME} - Senior Software Engineer`,
  description: `Senior Software Engineer with ${years}+ years of experience building scalable web applications, mobile solutions, and distributed systems with Node.js, Vue.js, Angular, and NestJS.`,
  type: 'profile',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      person,
      { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { '@id': `${SITE_URL}/#person` } },
      { '@type': 'ProfilePage', url: `${SITE_URL}/`, mainEntity: { '@id': `${SITE_URL}/#person` } }
    ]
  }
};

const blogMeta = {
  path: '/blog',
  title: `Blog - ${SITE_NAME}`,
  description: 'Long-form writing on system architecture, AI-driven tooling, and lessons from shipping production software.',
  type: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    url: `${SITE_URL}/blog`,
    name: `${SITE_NAME} - Blog`,
    author: { '@id': `${SITE_URL}/#person` },
    blogPost: posts.en.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.datePublished
    }))
  }
};

const postMeta = (post) => ({
  path: `/blog/${post.slug}`,
  title: `${post.title} - ${SITE_NAME}`,
  description: post.excerpt,
  type: 'article',
  publishedTime: post.datePublished,
  tags: post.tags,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.datePublished,
    image: OG_IMAGE,
    keywords: post.tags.join(', '),
    author: person
  }
});

export const notFoundMeta = {
  path: null,
  title: `Page not found - ${SITE_NAME}`,
  description: "This page doesn't exist.",
  type: 'website',
  noindex: true,
  jsonLd: null
};

// Indexable routes, in sitemap order.
export const routes = [homeMeta, blogMeta, ...posts.en.map(postMeta)];

// Posts are looked up in English: crawlers render the default locale, and the
// French version lives on the same URL.
export function getMeta(path) {
  const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return routes.find((route) => route.path === normalized) || notFoundMeta;
}

export function getPostMeta(slug, locale = 'en') {
  const post = (posts[locale] || posts.en).find((p) => p.slug === slug);
  return post ? { ...postMeta(post), path: `/blog/${slug}` } : notFoundMeta;
}

// Tag definitions shared by the client updater and the build-time renderer.
export function metaTags(meta) {
  const url = meta.path ? `${SITE_URL}${meta.path === '/' ? '/' : meta.path}` : null;
  const tags = [
    { name: 'description', content: meta.description },
    { name: 'robots', content: meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' },
    { property: 'og:type', content: meta.type },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'article:published_time', content: meta.publishedTime || null },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: OG_IMAGE }
  ];
  return { url, tags };
}
