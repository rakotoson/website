<script setup>
import { Sun, Moon } from 'lucide-vue-next';

defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
});

defineEmits(['toggle-theme']);

const links = [
  { label: 'Home', to: { path: '/' } },
  { label: 'Skills', to: { path: '/', hash: '#skills' } },
  { label: 'Experience', to: { path: '/', hash: '#experience' } },
  { label: 'Projects', to: { path: '/', hash: '#projects' } },
  { label: 'Education', to: { path: '/', hash: '#education' } },
  { label: 'Blog', to: { path: '/blog' } }
];
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
      <router-link to="/" class="font-display font-bold text-sm shrink-0">AR</router-link>

      <div class="flex items-center gap-5 overflow-x-auto scrollbar-hide text-sm text-slate-600 dark:text-slate-400">
        <router-link
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="whitespace-nowrap hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {{ link.label }}
        </router-link>
      </div>

      <button
        @click="$emit('toggle-theme')"
        class="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-colors duration-200"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      >
        <Sun v-if="isDark" class="w-4 h-4" />
        <Moon v-else class="w-4 h-4" />
      </button>
    </div>
  </nav>
</template>
