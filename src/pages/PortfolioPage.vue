<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { skills, experience as experienceData, contactInfo as contactInfoData, education as educationData } from '@/data/portfolio';
import ContactModal from '@/components/ContactModal.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import EducationSection from '@/components/EducationSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';

const { t, locale } = useI18n();

const experience = computed(() => experienceData[locale.value]);
const contactInfo = computed(() => contactInfoData[locale.value]);
const education = computed(() => educationData[locale.value]);

const projects = computed(() => {
  const primaryProjects = experience.value.map((exp) => ({ ...exp.projects[0], company: exp.company }));
  const additionalProjects = experience.value.flatMap((exp) =>
    exp.projects.slice(1).map((project) => ({ ...project, company: exp.company }))
  );
  return [...primaryProjects, ...additionalProjects];
});

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

        <section id="experience" class="scroll-mt-20">
          <h2 class="section-heading">{{ t('sections.experience') }}</h2>
          <ExperienceSection :items="experience" />
        </section>

        <section id="projects" class="scroll-mt-20">
          <h2 class="section-heading">{{ t('sections.projects') }}</h2>
          <ProjectsSection :items="projects" />
        </section>

        <section id="skills" class="scroll-mt-20">
          <h2 class="section-heading">{{ t('sections.skills') }}</h2>
          <SkillsSection :skills="skills" />
        </section>

        <section id="education" class="scroll-mt-20">
          <h2 class="section-heading">{{ t('sections.education') }}</h2>
          <EducationSection :items="education" />
        </section>
      </div>

      <!-- Footer -->
      <footer class="mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-600">
        &copy; {{ new Date().getFullYear() }} {{ t('footer.copyright') }}
      </footer>
    </div>

    <!-- Contact Modal Component -->
    <ContactModal :show="showContactModal" @close="showContactModal = false" />
  </div>
</template>
