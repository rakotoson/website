<script setup>
import { User, MapPin, Globe, GraduationCap, Briefcase, Award } from 'lucide-vue-next';
import { education, contactInfo } from '@/data/portfolio';
</script>

<template>
  <section id="about" class="py-24 px-4 bg-white">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <!-- Left Column - Bio -->
        <div>
          <p class="text-slate-600 text-lg leading-relaxed mb-6">
            I'm a passionate software engineer with over <span class="font-semibold text-slate-900">7 years of experience</span> in full-stack development.
            I specialize in building scalable web applications, mobile solutions, and distributed systems
            using modern technologies.
          </p>
          <p class="text-slate-600 text-lg leading-relaxed mb-8">
            My expertise spans across backend development with <span class="font-semibold text-slate-900">Node.js</span> and <span class="font-semibold text-slate-900">Ruby</span>, frontend development
            with <span class="font-semibold text-slate-900">Angular</span> and <span class="font-semibold text-slate-900">React</span>, and managing complex databases.
          </p>
          
          <!-- Quick Info -->
          <div class="flex flex-wrap gap-6">
            <div class="flex items-center gap-2 text-slate-600">
              <MapPin class="w-5 h-5 text-blue-500" />
              <span>{{ contactInfo.location }}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-600">
              <Globe class="w-5 h-5 text-blue-500" />
              <span>{{ contactInfo.languages }}</span>
            </div>
          </div>
        </div>
        
        <!-- Right Column - Education & Stats -->
        <div class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="bg-slate-50 rounded-2xl p-4 text-center">
              <div class="text-3xl font-bold text-blue-600">7+</div>
              <div class="text-sm text-slate-500">Years Exp.</div>
            </div>
            <div class="bg-slate-50 rounded-2xl p-4 text-center">
              <div class="text-3xl font-bold text-purple-600">50+</div>
              <div class="text-sm text-slate-500">Projects</div>
            </div>
            <div class="bg-slate-50 rounded-2xl p-4 text-center">
              <div class="text-3xl font-bold text-pink-600">6</div>
              <div class="text-sm text-slate-500">Companies</div>
            </div>
          </div>
          
          <!-- Education -->
          <div class="bg-slate-50 rounded-2xl p-6">
            <div class="flex items-center gap-2 mb-4">
              <GraduationCap class="w-5 h-5 text-blue-500" />
              <h3 class="font-semibold text-slate-900">Education</h3>
            </div>
            <div class="space-y-4">
              <div v-for="(edu, index) in education" :key="index" class="border-l-2 border-blue-200 pl-4">
                <div class="font-medium text-slate-900">{{ edu.title }}</div>
                <div class="text-sm text-slate-500">{{ edu.institution }}</div>
                <div v-if="edu.detail" class="text-sm text-blue-600">{{ edu.detail }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
