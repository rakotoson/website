<script setup>
import { Mail, MessageCircle, MapPin } from 'lucide-vue-next';

const props = defineProps({
  contactInfo: {
    type: Object,
    required: true
  }
});

const whatsappLink = `https://wa.me/${props.contactInfo.phone.replace(/\D/g, '')}`;
</script>

<template>
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
</template>
