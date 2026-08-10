<script setup>
defineProps({
  skills: {
    type: Object,
    required: true
  }
});

const label = (key) => key.charAt(0).toUpperCase() + key.slice(1);
</script>

<template>
  <dl class="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-3">
    <template v-for="(values, key) in skills" :key="key">
      <dt class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 pt-0.5">{{ label(key) }}</dt>
      <dd class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{{ values.join(', ') }}</dd>
    </template>
  </dl>
</template>
