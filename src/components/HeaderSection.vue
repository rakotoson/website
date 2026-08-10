<script setup>
import ActionButtons from '@/components/ActionButtons.vue';
import OfferingsSection from '@/components/OfferingsSection.vue';
import ContactInfo from '@/components/ContactInfo.vue';

defineProps({
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
</script>

<template>
  <header class="min-h-screen flex flex-col gap-5">
    <h1 class="font-display text-4xl sm:text-5xl font-bold tracking-tight">Avotra Niaina Rakotoson</h1>
    <p class="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mt-3">
      Senior Software Engineer
    </p>

    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mt-6 max-w-2xl">
      {{ yearsOfExperience }}+ years building systems that scale — search APIs handling 100,000+ requests
      per second, AI-driven tooling at 95% accuracy, and platforms serving thousands of users.
      Currently architecting fullstack solutions across Node.js, Vue.js, Angular, and NestJS.
    </p>

    <ContactInfo :contact-info="contactInfo" />

    <OfferingsSection />

    <p class="text-sm text-slate-500 dark:text-slate-400 mt-6">
      <span class="font-semibold text-slate-900 dark:text-white">Rate:</span> starting at $150/day — always happy to discuss scope and fit.
    </p>

    <ActionButtons :contact-info="contactInfo" @get-in-touch="$emit('get-in-touch')" />
  </header>
</template>
