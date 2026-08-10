<script setup>
import { reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Send, X, MessageCircle } from 'lucide-vue-next';
import { contactInfo as contactInfoData } from '@/data/portfolio';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const { t, locale } = useI18n();
const contactInfo = computed(() => contactInfoData[locale.value]);

const contactForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  const mailtoLink = `mailto:${contactInfo.value.email}?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`)}`;
  window.open(mailtoLink);
  emit('close');
  contactForm.name = '';
  contactForm.email = '';
  contactForm.subject = '';
  contactForm.message = '';
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-black/80 transition-colors duration-300"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-md bg-white dark:bg-black border border-slate-900 dark:border-white overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 flex items-center justify-center border border-slate-900 dark:border-white">
                <MessageCircle class="w-5 h-5 text-slate-900 dark:text-white" />
              </div>
              <div>
                <h3 class="text-lg font-display font-bold text-slate-900 dark:text-white transition-colors duration-300">{{ t('contactModal.title') }}</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs transition-colors duration-300">{{ t('contactModal.subtitle') }}</p>
              </div>
            </div>
            <button
              @click="closeModal"
              class="w-8 h-8 flex items-center justify-center border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">{{ t('contactModal.name') }}</label>
                <input
                  v-model="contactForm.name"
                  type="text"
                  required
                  :placeholder="t('contactModal.namePlaceholder')"
                  class="w-full px-4 py-2.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">{{ t('contactModal.email') }}</label>
                <input
                  v-model="contactForm.email"
                  type="email"
                  required
                  :placeholder="t('contactModal.emailPlaceholder')"
                  class="w-full px-4 py-2.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">{{ t('contactModal.subject') }}</label>
              <input
                v-model="contactForm.subject"
                type="text"
                required
                :placeholder="t('contactModal.subjectPlaceholder')"
                class="w-full px-4 py-2.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all duration-300"
              />
            </div>

            <div>
              <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">{{ t('contactModal.message') }}</label>
              <textarea
                v-model="contactForm.message"
                required
                rows="4"
                :placeholder="t('contactModal.messagePlaceholder')"
                class="w-full px-4 py-2.5 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-all resize-none duration-300"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-invert w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 font-semibold cursor-pointer"
            >
              <Send class="w-4 h-4" />
              <span>{{ t('contactModal.send') }}</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
