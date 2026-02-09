<script setup>
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-vue-next';
import { contactInfo } from '@/data/portfolio';
</script>

<template>
  <section id="contact" class="py-24 px-4 bg-white relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
        <p class="text-slate-600 text-lg max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>
      
      <!-- Contact Cards -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <a
          :href="`mailto:${contactInfo.email}`"
          class="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div class="w-14 h-14 bg-blue-100 group-hover:bg-blue-500 rounded-xl flex items-center justify-center transition-colors">
            <Mail class="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div class="text-sm text-slate-400 mb-1">Email</div>
            <div class="font-medium text-slate-900">{{ contactInfo.email }}</div>
          </div>
        </a>
        
        <a
          :href="`tel:${contactInfo.phone.replace(/\s/g, '')}`"
          class="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-purple-200 hover:shadow-lg transition-all flex items-center gap-4"
        >
          <div class="w-14 h-14 bg-purple-100 group-hover:bg-purple-500 rounded-xl flex items-center justify-center transition-colors">
            <Phone class="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div class="text-sm text-slate-400 mb-1">Phone</div>
            <div class="font-medium text-slate-900">{{ contactInfo.phone }}</div>
          </div>
        </a>
      </div>
      
      <!-- Social Links -->
      <div class="flex justify-center gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 bg-slate-100 hover:bg-slate-900 rounded-xl flex items-center justify-center transition-all group"
        >
          <Github class="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          class="w-12 h-12 bg-slate-100 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all group"
        >
          <Linkedin class="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
        </a>
      </div>
    </div>
  </section>
</template>
