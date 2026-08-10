<script setup>
import { Code, Server, Cloud } from 'lucide-vue-next';

defineProps({
  skills: {
    type: Object,
    required: true
  }
});

const categories = [
  { key: 'languages', label: 'Languages', icon: Code, iconWrap: 'bg-blue-50 dark:bg-blue-500/20', iconColor: 'text-blue-500 dark:text-blue-400' },
  { key: 'frameworks', label: 'Frameworks', icon: Server, iconWrap: 'bg-purple-50 dark:bg-purple-500/20', iconColor: 'text-purple-500 dark:text-purple-400' },
  { key: 'databases', label: 'Databases', icon: Cloud, iconWrap: 'bg-pink-50 dark:bg-pink-500/20', iconColor: 'text-pink-500 dark:text-pink-400' }
];
</script>

<template>
  <section class="mb-6 lg:mb-8 flex-shrink-0">
    <h2 class="section-header text-lg lg:text-xl font-bold text-slate-900 dark:text-white mb-5 lg:mb-6 transition-colors duration-300">Core Skills</h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
      <div
        v-for="category in categories"
        :key="category.key"
        class="skill-category shadow-sm flex flex-col h-full bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 transition-colors duration-300"
      >
        <div class="flex items-center gap-2.5 text-slate-500 dark:text-slate-300 text-xs font-medium mb-3 uppercase tracking-wider transition-colors duration-300">
          <div :class="['w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-300', category.iconWrap]">
            <component :is="category.icon" class="w-3.5 h-3.5" :class="category.iconColor" />
          </div>
          <span>{{ category.label }}</span>
        </div>
        <div class="flex flex-wrap gap-2 mt-auto">
          <span
            v-for="skill in skills[category.key]"
            :key="skill"
            class="skill-pill px-2.5 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-700/50 transition-colors duration-300"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
