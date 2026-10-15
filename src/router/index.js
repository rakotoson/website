import { createRouter, createWebHistory } from 'vue-router';
import PortfolioPage from '@/pages/PortfolioPage.vue';
import BlogPage from '@/pages/BlogPage.vue';
import BlogPostPage from '@/pages/BlogPostPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: PortfolioPage },
    { path: '/blog', name: 'blog', component: BlogPage },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0 };
  }
});

export default router;
