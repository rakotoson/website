<script setup>
import { ArrowRight } from 'lucide-vue-next';
import { posts } from '@/data/blog';
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 min-h-screen">
    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mt-6 max-w-xl">
      Long-form writing on system architecture, AI-driven tooling, and lessons from shipping production software.
    </p>

    <div class="space-y-4 mt-10">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-200 p-5 sm:p-6"
      >
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span>{{ post.date }}</span>
          <span>&middot;</span>
          <span>{{ post.readTime }}</span>
          <span>&middot;</span>
          <span>{{ post.tags.join(', ') }}</span>
        </div>

        <h2 class="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{{ post.title }}</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{{ post.excerpt }}</p>

        <router-link
          :to="`/blog/${post.slug}`"
          class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white hover:gap-2.5 transition-all"
        >
          Read More
          <ArrowRight class="w-4 h-4" />
        </router-link>
      </article>
    </div>
  </div>
</template>
