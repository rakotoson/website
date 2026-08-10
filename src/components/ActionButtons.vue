<script setup>
import { GithubIcon, LinkedinIcon, Download, MessageCircle } from 'lucide-vue-next';

const props = defineProps({
  contactInfo: {
    type: Object,
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
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      class="btn-invert w-10 h-10 flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white"
    >
      <MessageCircle class="w-4 h-4" />
    </a>
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
</template>
