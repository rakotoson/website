<script setup>
import { ref } from 'vue';
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

const startYear = 2017;
const currentYear = new Date().getFullYear();
const yearsOfExperience = currentYear - startYear;
</script>

<template>
  <div>
    <div class="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
      <!-- Header -->
      <HeaderSection
        :contact-info="contactInfo"
        :years-of-experience="yearsOfExperience"
        @get-in-touch="showContactModal = true"
      />

      <div class="space-y-16">
        <section id="skills" class="scroll-mt-20">
          <h2 class="section-heading">Skills</h2>
          <SkillsSection :skills="skills" />
        </section>

        <section id="experience" class="scroll-mt-20">
          <h2 class="section-heading">Experience</h2>
          <ExperienceSection :items="experience" />
        </section>

        <section id="projects" class="scroll-mt-20">
          <h2 class="section-heading">Projects</h2>
          <ProjectsSection :items="projects" />
        </section>

        <section id="education" class="scroll-mt-20">
          <h2 class="section-heading">Education</h2>
          <EducationSection :items="education" />
        </section>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600">
        &copy; {{ new Date().getFullYear() }} Avotra Niaina Rakotoson
      </footer>
    </div>

    <!-- Contact Modal Component -->
    <ContactModal :show="showContactModal" @close="showContactModal = false" />
  </div>
</template>
