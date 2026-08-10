<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Sun, Moon } from 'lucide-vue-next';

defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
});

defineEmits(['toggle-theme']);

const { t, locale } = useI18n();

const links = computed(() => [
  { label: t('nav.home'), to: { path: '/' } },
  { label: t('nav.experience'), to: { path: '/', hash: '#experience' } },
  { label: t('nav.projects'), to: { path: '/', hash: '#projects' } },
  { label: t('nav.skills'), to: { path: '/', hash: '#skills' } },
  { label: t('nav.education'), to: { path: '/', hash: '#education' } },
  { label: t('nav.blog'), to: { path: '/blog' } }
]);

const setLocale = (value) => {
  locale.value = value;
  localStorage.setItem('locale', value);
};
</script>

<template>
  <nav class="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
    <div class="max-w-5xl mx-auto px-6 sm:px-8 h-14 flex items-center justify-between gap-4">
      <router-link to="/" class="font-display font-bold text-sm shrink-0">
        avotra<span class="align-super text-[10px]">&reg;</span>
      </router-link>

      <div class="flex items-center gap-5 overflow-x-auto scrollbar-hide text-sm text-slate-600 dark:text-slate-400">
        <router-link
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="whitespace-nowrap hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          {{ link.label }}
        </router-link>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <div class="flex items-center rounded-full border border-slate-300 dark:border-slate-700 p-0.5 text-xs font-semibold">
          <button
            @click="setLocale('en')"
            class="px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer"
            :class="locale === 'en' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            :aria-pressed="locale === 'en'"
            aria-label="English"
          >
            EN
          </button>
          <button
            @click="setLocale('fr')"
            class="px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer"
            :class="locale === 'fr' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
            :aria-pressed="locale === 'fr'"
            aria-label="Français"
          >
            FR
          </button>
        </div>

        <button
          @click="$emit('toggle-theme')"
          class="w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-colors duration-200 cursor-pointer"
          :title="isDark ? t('theme.toLight') : t('theme.toDark')"
          :aria-label="isDark ? t('theme.toLight') : t('theme.toDark')"
        >
          <Sun v-if="isDark" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </button>
      </div>
    </div>
  </nav>
</template>
