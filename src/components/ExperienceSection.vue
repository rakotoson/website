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
    <div v-for="(exp, index) in items" :key="index" class="experience-item flex gap-3 lg:gap-4 group hover:bg-slate-50 dark:hover:bg-slate-800/30 p-3 rounded-2xl transition-colors duration-300">
      <div class="flex flex-col items-center pt-2">
        <div class="timeline-dot w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-blue-500 transition-colors duration-300"></div>
        <div v-if="index < items.length - 1" class="w-px flex-1 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent mt-3"></div>
      </div>
      <div class="flex-1 pb-5 lg:pb-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 lg:gap-2 mb-1.5">
          <h3 class="font-semibold text-slate-900 dark:text-white text-sm lg:text-base transition-colors duration-300">{{ exp.role }}</h3>
          <span class="text-[11px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-full transition-colors duration-300">{{ exp.period }}</span>
        </div>
        <p class="text-blue-600 dark:text-blue-400 text-sm lg:text-base font-medium transition-colors duration-300">{{ exp.company }}</p>
        <p class="text-slate-500 dark:text-slate-500 text-xs lg:text-sm mt-0.5 flex items-center gap-1 mb-3 transition-colors duration-300">
          <MapPin class="w-3 h-3" />
          {{ exp.location }}
        </p>
        <!-- Experience Details -->
        <ul v-if="exp.details" class="space-y-1.5">
          <li
            v-for="(detail, detailIndex) in exp.details"
            :key="detailIndex"
            class="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-xs lg:text-sm transition-colors duration-300"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-1.5 flex-shrink-0"></span>
            <span>{{ detail }}</span>
          </li>
        </ul>

        <!-- Associated Project -->
        <div v-if="exp.project" class="project-card mt-3 rounded-xl p-3 lg:p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/30 shadow-sm transition-all duration-300">
          <h4 class="font-bold text-slate-900 dark:text-white text-xs lg:text-sm mb-1 transition-colors duration-300">{{ exp.project.title }}</h4>
          <p class="text-slate-500 dark:text-slate-400 text-xs lg:text-sm mb-3 leading-relaxed transition-colors duration-300">{{ exp.project.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in exp.project.tech"
              :key="tech"
              class="tech-tag px-2.5 py-1 rounded-lg text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-700/50 transition-colors duration-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
