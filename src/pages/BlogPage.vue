<script setup>
import { ArrowLeft } from 'lucide-vue-next';
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 min-h-screen">
    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight">Blog</h1>
    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mt-6 max-w-xl">
      Long-form writing on system architecture, AI-driven tooling, and lessons from shipping production software.
      Coming soon.
    </p>

    <router-link
      to="/"
      class="btn-invert inline-flex items-center gap-2 mt-8 px-5 py-2.5 text-sm font-semibold border border-slate-900 dark:border-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900"
    >
      <ArrowLeft class="w-4 h-4" />
      Back to Home
    </router-link>
  </div>
</template>
