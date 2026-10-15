<script setup>
import { useI18n } from 'vue-i18n';
import { ArrowLeft } from 'lucide-vue-next';

const { t } = useI18n();
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 min-h-screen">
    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight">404</h1>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mt-6">{{ t('notFound.message') }}</p>
    <router-link
      to="/"
      class="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ t('blog.backToHome') }}
    </router-link>
  </div>
</template>
