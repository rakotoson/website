<script setup>
import { Code, Server, Database, Wrench, BookOpen } from 'lucide-vue-next';
import { skills } from '@/data/portfolio';

const categoryConfig = {
  languages: { icon: Code, color: 'blue' },
  frameworks: { icon: Server, color: 'purple' },
  databases: { icon: Database, color: 'green' },
  tools: { icon: Wrench, color: 'orange' },
  methodologies: { icon: BookOpen, color: 'pink' }
};

const getCategoryLabel = (category) => {
  const labels = {
    languages: 'Programming Languages',
    frameworks: 'Frameworks & Libraries',
    databases: 'Databases',
    tools: 'Tools & DevOps',
    methodologies: 'Methodologies'
  };
  return labels[category] || category;
};
</script>

<template>
  <section id="skills" class="py-24 px-4 bg-slate-50">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">Technical Skills</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(items, category) in skills"
          :key="category"
          class="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all"
        >
          <div class="flex items-center gap-3 mb-5">
            <div 
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center',
                categoryConfig[category]?.color === 'blue' ? 'bg-blue-100' : '',
                categoryConfig[category]?.color === 'purple' ? 'bg-purple-100' : '',
                categoryConfig[category]?.color === 'green' ? 'bg-green-100' : '',
                categoryConfig[category]?.color === 'orange' ? 'bg-orange-100' : '',
                categoryConfig[category]?.color === 'pink' ? 'bg-pink-100' : ''
              ]"
            >
              <component 
                :is="categoryConfig[category]?.icon" 
                :class="[
                  'w-5 h-5',
                  categoryConfig[category]?.color === 'blue' ? 'text-blue-600' : '',
                  categoryConfig[category]?.color === 'purple' ? 'text-purple-600' : '',
                  categoryConfig[category]?.color === 'green' ? 'text-green-600' : '',
                  categoryConfig[category]?.color === 'orange' ? 'text-orange-600' : '',
                  categoryConfig[category]?.color === 'pink' ? 'text-pink-600' : ''
                ]"
              />
            </div>
            <h3 class="font-semibold text-slate-900">
              {{ getCategoryLabel(category) }}
            </h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in items"
              :key="skill"
              class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all cursor-default"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
