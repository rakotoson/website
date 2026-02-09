<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Code2 } from 'lucide-vue-next';
import { menuItems } from '@/data/portfolio';

const props = defineProps({
  activeSection: {
    type: String,
    default: 'home'
  }
});

const emit = defineEmits(['scroll-to-section']);

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId.toLowerCase());
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Code2 class="w-5 h-5 text-white" />
          </div>
          <span class="font-semibold text-slate-900">DevPortfolio</span>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6">
          <button
            v-for="item in menuItems"
            :key="item"
            @click="scrollToSection(item)"
            :class="[
              'text-sm transition-colors cursor-pointer',
              activeSection === item.toLowerCase() 
                ? 'text-blue-600 font-medium' 
                : 'text-slate-600 hover:text-slate-900'
            ]"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
