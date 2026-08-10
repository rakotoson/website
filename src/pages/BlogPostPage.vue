<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { posts } from '@/data/blog';

const route = useRoute();
const post = computed(() => posts.find((p) => p.slug === route.params.slug));
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 min-h-screen">
    <router-link
      to="/blog"
      class="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      Back to Blog
    </router-link>

    <article v-if="post" class="mt-10">
      <h1 class="font-display text-3xl sm:text-4xl font-bold tracking-tight">{{ post.title }}</h1>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-4">
        <span>{{ post.date }}</span>
        <span>&middot;</span>
        <span>{{ post.readTime }}</span>
        <span>&middot;</span>
        <span>{{ post.tags.join(', ') }}</span>
      </div>

      <div class="mt-8 space-y-5">
        <template v-for="(block, index) in post.blocks" :key="index">
          <p v-if="block.type === 'paragraph'" class="text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ block.text }}
          </p>
          <h2 v-else-if="block.type === 'heading'" class="font-display text-xl font-bold text-slate-900 dark:text-white pt-3">
            {{ block.text }}
          </h2>
          <pre
            v-else-if="block.type === 'code'"
            class="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-4 text-xs text-slate-700 dark:text-slate-300 overflow-x-auto"
          ><code>{{ block.text }}</code></pre>
          <ul v-else-if="block.type === 'list'" class="space-y-1.5">
            <li
              v-for="(item, itemIndex) in block.items"
              :key="itemIndex"
              class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <span class="text-slate-400 dark:text-slate-600 mt-0.5">&mdash;</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </template>
      </div>
    </article>

    <div v-else class="mt-10">
      <p class="text-slate-600 dark:text-slate-300">This post doesn't exist.</p>
    </div>
  </div>
</template>
