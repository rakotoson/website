<script setup>
import { ChevronRight, ExternalLink } from 'lucide-vue-next';
import { projects } from '@/data/portfolio';
</script>

<template>
  <section id="projects" class="py-24 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div class="space-y-8">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Content Side -->
            <div class="p-8 md:p-10">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-slate-900 mb-2">{{ project.title }}</h3>
                  <p class="text-blue-600 font-medium">{{ project.role }}</p>
                  <p class="text-slate-500 text-sm">{{ project.company }}</p>
                </div>
              </div>
              
              <p class="text-slate-600 mb-6">{{ project.description }}</p>
              
              <!-- Highlights -->
              <div class="mb-6">
                <h4 class="font-semibold text-slate-900 mb-3">Key Achievements</h4>
                <ul class="space-y-2">
                  <li
                    v-for="(highlight, i) in project.highlights.slice(0, 4)"
                    :key="i"
                    class="flex items-start gap-2 text-slate-600 text-sm"
                  >
                    <ChevronRight class="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{{ highlight }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Visual Side -->
            <div class="relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
              <!-- Gradient Accent -->
              <div class="absolute inset-0 project-gradient opacity-40"></div>
              
              <!-- Code Preview Pattern -->
              <div class="absolute inset-0 p-8 opacity-60">
                <div class="space-y-2">
                  <div class="h-3 bg-white/10 rounded w-3/4"></div>
                  <div class="h-3 bg-white/10 rounded w-1/2"></div>
                  <div class="h-3 bg-white/10 rounded w-5/6"></div>
                  <div class="h-3 bg-white/5 rounded w-2/3"></div>
                  <div class="h-3 bg-white/10 rounded w-4/5"></div>
                  <div class="h-3 bg-white/5 rounded w-1/2"></div>
                  <div class="h-3 bg-white/10 rounded w-3/4"></div>
                  <div class="h-3 bg-white/5 rounded w-5/6"></div>
                  <div class="h-3 bg-white/10 rounded w-2/3"></div>
                  <div class="h-3 bg-white/5 rounded w-4/5"></div>
                </div>
              </div>
              
              <!-- Floating dots -->
              <div class="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div class="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.5s"></div>
              <div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style="animation-delay: 1s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
