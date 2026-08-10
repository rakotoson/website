<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});

const num = (index) => String(index + 1).padStart(2, '0');
</script>

<template>
  <div>
    <div
      v-for="(edu, index) in items"
      :key="index"
      class="flex gap-4 sm:gap-6 py-6 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
    >
      <span class="entry-index text-2xl sm:text-3xl font-bold text-slate-300 dark:text-slate-700 shrink-0">{{ num(index) }}</span>

      <div class="flex-1 min-w-0">
        <h3 class="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1">{{ edu.title }}</h3>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">{{ edu.institution }}</p>
        <p v-if="edu.location" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ edu.location }}</p>
        <p v-if="edu.detail" class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ edu.detail }}</p>
      </div>
    </div>
  </div>
</template>
