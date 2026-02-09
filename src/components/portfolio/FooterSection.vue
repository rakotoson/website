<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="py-8 px-4 bg-slate-50 border-t border-slate-100">
    <div class="max-w-6xl mx-auto text-center">
      <p class="text-slate-500 text-sm">
        &copy; {{ currentYear }} Avotra Niaina Rakotoson. Crafted with ❤️ using Vue.js
      </p>
    </div>
  </footer>
</template>
