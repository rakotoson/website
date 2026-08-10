<script setup>
import { useI18n } from 'vue-i18n';
import { Network, Layers, Bot } from 'lucide-vue-next';

const { t } = useI18n();

const offerings = [
  { key: 'architecture', icon: Network },
  { key: 'fullstack', icon: Layers },
  { key: 'automation', icon: Bot }
];
</script>

<template>
  <div class="grid sm:grid-cols-3 gap-4 sm:gap-5">
    <div
      v-for="offering in offerings"
      :key="offering.key"
      class="bg-white dark:bg-black shadow-sm hover:shadow-md transition-shadow duration-200 p-5"
    >
      <component :is="offering.icon" class="w-5 h-5 text-slate-400 dark:text-slate-500 mb-3" />
      <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{{ t(`offerings.${offering.key}.title`) }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ t(`offerings.${offering.key}.description`) }}</p>
    </div>
  </div>
</template>
