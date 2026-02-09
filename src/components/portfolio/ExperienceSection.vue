<script setup>
import { Briefcase, Calendar, MapPin } from 'lucide-vue-next';
import { experience } from '@/data/portfolio';
</script>

<template>
  <section id="experience" class="py-24 px-4 bg-slate-50">
    <div class="max-w-4xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">Work Experience</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div class="relative">
        <!-- Timeline Line -->
        <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform md:-translate-x-1/2"></div>
        
        <div class="space-y-12">
          <div
            v-for="(exp, index) in experience"
            :key="index"
            :class="[
              'relative pl-8 md:pl-0',
              index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:text-left'
            ]"
          >
            <!-- Timeline Dot -->
            <div 
              :class="[
                'absolute top-2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full transform',
                'left-0 md:left-1/2 md:-translate-x-1/2'
              ]"
            ></div>
            
            <!-- Card -->
            <div 
              :class="[
                'bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all ml-4 md:ml-0',
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              ]"
            >
              <div class="flex items-center gap-2 text-blue-600 text-sm font-medium mb-2">
                <Calendar class="w-4 h-4" />
                <span>{{ exp.period }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-1">{{ exp.company }}</h3>
              <p class="text-slate-600 font-medium mb-2">{{ exp.role }}</p>
              <div class="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin class="w-4 h-4" />
                <span>{{ exp.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
