<script setup>
import { MapPin } from 'lucide-vue-next';

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="space-y-1">
    <div v-for="(edu, index) in items" :key="index" class="experience-item flex gap-3 lg:gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-300 group">
      <div class="flex flex-col items-center pt-2">
        <div class="timeline-dot w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-500 transition-colors duration-300"></div>
        <div v-if="index < items.length - 1" class="w-px flex-1 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent mt-3"></div>
      </div>
      <div class="flex-1 pb-5 lg:pb-6">
        <h3 class="font-semibold text-slate-900 dark:text-white text-sm lg:text-base mb-1 transition-colors duration-300">{{ edu.title }}</h3>
        <p class="text-slate-600 dark:text-slate-400 text-sm lg:text-base transition-colors duration-300">{{ edu.institution }}</p>
        <p v-if="edu.location" class="text-slate-500 dark:text-slate-500 text-xs lg:text-sm mt-0.5 flex items-center gap-1 transition-colors duration-300">
          <MapPin class="w-3 h-3" />
          {{ edu.location }}
        </p>
        <p v-if="edu.detail" class="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-xs lg:text-sm font-medium mt-1">{{ edu.detail }}</p>
      </div>
    </div>
  </div>
</template>
