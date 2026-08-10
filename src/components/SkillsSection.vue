<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  skills: {
    type: Object,
    required: true
  }
});

const { t } = useI18n();

const durationFor = (count) => `${count * 3}s`;
</script>

<template>
  <div class="space-y-6">
    <div v-for="(values, key, index) in skills" :key="key">
      <div class="overflow-hidden">
        <div
          :class="['flex w-max gap-3 hover:[animation-play-state:paused]', index % 2 === 0 ? 'marquee-left' : 'marquee-right']"
          :style="{ '--marquee-duration': durationFor(values.length) }"
        >
          <span
            v-for="(skill, i) in [...values, ...values]"
            :key="i"
            class="whitespace-nowrap rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
