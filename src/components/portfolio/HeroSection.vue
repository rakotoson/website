<script setup>
import { ArrowRight, ArrowDown } from 'lucide-vue-next';

const emit = defineEmits(['scroll-to-section']);

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId);
};

const techSkills = ['Node.js', 'TypeScript', 'Angular', 'React', 'NestJS'];
</script>

<template>
  <section id="home" class="min-h-screen relative overflow-hidden grid-bg">
    <!-- Gradient Blobs -->
    <div class="gradient-blob blob-pink top-1/4 left-1/2 -translate-x-1/2"></div>
    <div class="gradient-blob blob-blue top-1/3 right-0 translate-x-1/2 opacity-30"></div>
    
    <!-- Floating Emojis -->
    <div class="absolute top-32 left-20 text-4xl float-animation-slow hidden md:block">⚙️</div>
    <div class="absolute top-28 right-1/4 text-3xl float-animation hidden md:block">🚀</div>
    <div class="absolute top-1/2 left-16 text-3xl float-animation-reverse hidden md:block">💻</div>
    <div class="absolute bottom-48 left-1/4 text-3xl float-animation hidden md:block">🎯</div>
    <div class="absolute bottom-40 right-20 text-4xl float-animation-slow hidden md:block">🔥</div>
    <div class="absolute top-1/2 right-1/4 text-3xl float-animation-reverse hidden md:block">⚡</div>
    
    <!-- Main Content -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Name -->
        <h1 class="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">
          Avotra Niaina<br>Rakotoson
        </h1>
        
        <!-- Role with lines -->
        <div class="flex items-center justify-center gap-4 mb-6">
          <div class="w-16 h-px bg-slate-300"></div>
          <span class="text-blue-600 font-medium text-lg">Software Engineer</span>
          <div class="w-16 h-px bg-slate-300"></div>
        </div>
        
        <!-- Description -->
        <p class="text-slate-600 text-lg mb-8 max-w-xl mx-auto">
          Crafting exceptional digital experiences with modern web technologies
        </p>
        
        <!-- Tech Pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <span
            v-for="skill in techSkills"
            :key="skill"
            class="skill-pill px-4 py-2 rounded-full text-sm text-slate-700"
          >
            {{ skill }}
          </span>
        </div>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button
            @click="scrollToSection('projects')"
            class="btn-primary px-8 py-3 rounded-full font-medium text-slate-900 flex items-center gap-2 cursor-pointer"
          >
            View My Work
            <ArrowRight class="w-4 h-4" />
          </button>
          <button
            @click="scrollToSection('contact')"
            class="btn-secondary px-8 py-3 rounded-full font-medium text-slate-700 cursor-pointer"
          >
            Get in Touch
          </button>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="flex flex-col items-center text-slate-400 mt-8">
          <span class="text-sm mb-2">Scroll to explore</span>
          <ArrowDown class="w-5 h-5 bounce-animation" />
        </div>
      </div>
    </div>
  </section>
</template>
