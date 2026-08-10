<script setup>
import { GithubIcon, LinkedinIcon, MessageCircle, Mail, MapPin, Download } from 'lucide-vue-next';

const props = defineProps({
  contactInfo: {
    type: Object,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  }
});

defineEmits(['get-in-touch']);

const whatsappLink = `https://wa.me/${props.contactInfo.phone.replace(/\D/g, '')}`;

const downloadResume = () => {
  const link = document.createElement('a');
  link.href = '/cv_avotra.pdf';
  link.download = 'Avotra_Niaina_Rakotoson_Resume.pdf';
  link.click();
};
</script>

<template>
  <header class="mb-16">
    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight">Avotra Niaina Rakotoson</h1>
    <p class="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-3">
      Senior Software Engineer
    </p>

    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mt-6 max-w-2xl">
      {{ yearsOfExperience }}+ years building systems that scale — search APIs handling 100,000+ requests
      per second, AI-driven tooling at 95% accuracy, and platforms serving thousands of users.
      Currently architecting fullstack solutions across Node.js, Vue.js, Angular, and NestJS.
    </p>

    <div class="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm text-slate-500 dark:text-slate-400">
      <a :href="`mailto:${contactInfo.email}`" class="flex items-center gap-1.5 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
        <Mail class="w-4 h-4" />
        {{ contactInfo.email }}
      </a>
      <a
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        class="flex items-center gap-1.5 underline underline-offset-4 decoration-slate-300 dark:decoration-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <MessageCircle class="w-4 h-4" />
        {{ contactInfo.phone }}
      </a>
      <span class="flex items-center gap-1.5">
        <MapPin class="w-4 h-4" />
        {{ contactInfo.location }}
      </span>
    </div>

    <div class="flex flex-wrap items-center gap-3 mt-8">
      <button
        @click="$emit('get-in-touch')"
        class="btn-invert px-5 py-2.5 text-sm font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 cursor-pointer"
      >
        Get In Touch
      </button>
      <button
        @click="downloadResume"
        class="btn-invert flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-slate-900 dark:border-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 cursor-pointer"
      >
        <Download class="w-4 h-4" />
        Resume
      </button>
      <a
        href="https://github.com/rakotoson"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        class="btn-invert w-10 h-10 flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white"
      >
        <GithubIcon class="w-4 h-4" />
      </a>
      <a
        href="https://www.linkedin.com/in/avotra-niaina-rakotoson-763a52165/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        class="btn-invert w-10 h-10 flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white"
      >
        <LinkedinIcon class="w-4 h-4" />
      </a>
    </div>
  </header>
</template>
