<script setup>
import { Network, Layers, Bot } from 'lucide-vue-next';

const offerings = [
  {
    icon: Network,
    title: 'Scalable Architecture',
    description: 'Architecting backend systems and APIs that hold up under real production load — built to scale with the business, not against it.'
  },
  {
    icon: Layers,
    title: 'Fullstack Delivery',
    description: 'End-to-end ownership from Figma prototypes and database migrations to production launch — no hand-offs, no gaps.'
  },
  {
    icon: Bot,
    title: 'AI-Driven Automation',
    description: 'Replacing manual, repetitive workflows with automation and AI agents where they genuinely save time and reduce errors.'
  }
];
</script>

<template>
  <div class="grid sm:grid-cols-3 gap-4 mt-8">
    <div
      v-for="offering in offerings"
      :key="offering.title"
      class="border border-slate-200 dark:border-slate-800 p-5"
    >
      <component :is="offering.icon" class="w-5 h-5 text-slate-400 dark:text-slate-500 mb-3" />
      <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{{ offering.title }}</h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{{ offering.description }}</p>
    </div>
  </div>
</template>
