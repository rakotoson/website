<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const VISIBLE_COUNT = 4;
const showAll = ref(false);
const visibleItems = computed(() => (showAll.value ? props.items : props.items.slice(0, VISIBLE_COUNT)));
</script>

<template>
  <div>
    <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">
      <div
        v-for="(proj, index) in visibleItems"
        :key="index"
        class="border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors duration-200 p-5 sm:p-6"
      >
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          {{ proj.company }}
        </p>
        <h3 class="font-display text-base font-bold text-slate-900 dark:text-white mb-2">{{ proj.title }}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{{ proj.description }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tech in proj.tech"
            :key="tech"
            class="text-xs border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <button
      v-if="items.length > VISIBLE_COUNT"
      @click="showAll = !showAll"
      class="btn-invert mt-6 px-5 py-2.5 text-sm font-semibold border border-slate-900 dark:border-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 cursor-pointer"
    >
      {{ showAll ? t('projectsSection.showLess') : t('projectsSection.showMore', { count: items.length - VISIBLE_COUNT }) }}
    </button>
  </div>
</template>
