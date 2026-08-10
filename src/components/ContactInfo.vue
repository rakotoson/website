<script setup>
import { Globe } from 'lucide-vue-next';

defineProps({
  contactInfo: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-slate-500 dark:text-slate-400">
    <span class="flex items-center gap-1.5">
      <Globe class="w-4 h-4" />
      {{ contactInfo.location }}
    </span>
  </div>
</template>
