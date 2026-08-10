<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';

const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
    <NavBar :is-dark="isDark" @toggle-theme="toggleTheme" />
    <router-view />
  </div>
</template>
