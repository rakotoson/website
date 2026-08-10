<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div>
    <div
      v-for="(exp, index) in items"
      :key="index"
      class="grid sm:grid-cols-[200px_1fr] gap-2 sm:gap-8 py-8 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
    >
      <div>
        <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ exp.period }}</p>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ exp.company }}</p>
        <p class="text-xs text-slate-400 dark:text-slate-600 mt-0.5">{{ exp.location }}</p>
      </div>

      <div>
        <h3 class="font-display text-lg font-bold text-slate-900 dark:text-white mb-3">{{ exp.role }}</h3>
        <ul v-if="exp.details" class="space-y-1.5">
          <li
            v-for="(detail, detailIndex) in exp.details"
            :key="detailIndex"
            class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            <span class="text-slate-400 dark:text-slate-600 mt-0.5">&mdash;</span>
            <span>{{ detail }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
