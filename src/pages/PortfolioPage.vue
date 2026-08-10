<script setup>
import { ref, onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';
import { skills, experience, contactInfo, education } from '@/data/portfolio';
import ContactModal from '@/components/ContactModal.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import EducationSection from '@/components/EducationSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';

const primaryProjects = experience.map((exp) => ({ ...exp.projects[0], company: exp.company }));
const additionalProjects = experience.flatMap((exp) =>
  exp.projects.slice(1).map((project) => ({ ...project, company: exp.company }))
);
const projects = [...primaryProjects, ...additionalProjects];

const showContactModal = ref(false);
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

const startYear = 2017;
const currentYear = new Date().getFullYear();
const yearsOfExperience = currentYear - startYear;
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
    <!-- Theme Toggle -->
    <button
      @click="toggleTheme"
      class="fixed top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-colors duration-200"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <Sun v-if="isDark" class="w-4 h-4" />
      <Moon v-else class="w-4 h-4" />
    </button>

    <div class="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
      <!-- Header -->
      <HeaderSection
        :contact-info="contactInfo"
        :years-of-experience="yearsOfExperience"
        @get-in-touch="showContactModal = true"
      />

      <div class="space-y-16">
        <section>
          <h2 class="section-heading">Skills</h2>
          <SkillsSection :skills="skills" />
        </section>

        <section>
          <h2 class="section-heading">Experience</h2>
          <ExperienceSection :items="experience" />
        </section>

        <section>
          <h2 class="section-heading">Projects</h2>
          <ProjectsSection :items="projects" />
        </section>

        <section>
          <h2 class="section-heading">Education</h2>
          <EducationSection :items="education" />
        </section>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600">
        &copy; {{ new Date().getFullYear() }} Avotra Niaina Rakotoson
      </footer>
    </div>
  </div>

  <!-- Contact Modal Component -->
  <ContactModal :show="showContactModal" @close="showContactModal = false" />
</template>
