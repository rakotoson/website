<script setup>
import { reactive } from 'vue';
import { Mail, Send, X, MessageCircle } from 'lucide-vue-next';
import { contactInfo } from '@/data/portfolio';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const contactForm = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  // Here you would typically send the form data to a backend
  console.log('Form submitted:', contactForm);
  // For now, open mailto with the message
  const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(`From: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`)}`;
  window.open(mailtoLink);
  emit('close');
  // Reset form
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
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-sm transition-colors duration-300"></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-md bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden transition-all duration-300">
          <!-- Gradient Top Border -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 transition-colors duration-300">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageCircle class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">Get In Touch</h3>
                <p class="text-slate-500 dark:text-slate-400 text-xs transition-colors duration-300">I'd love to hear from you!</p>
              </div>
            </div>
            <button 
              @click="closeModal"
              class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">Your Name</label>
                <input 
                  v-model="contactForm.name"
                  type="text" 
                  required
                  placeholder="John Doe"
                  class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:dark:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">Your Email</label>
                <input 
                  v-model="contactForm.email"
                  type="email" 
                  required
                  placeholder="john@example.com"
                  class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:dark:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">Subject</label>
              <input 
                v-model="contactForm.subject"
                type="text" 
                required
                placeholder="Project Inquiry"
                class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:dark:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>
            
            <div>
              <label class="block text-slate-600 dark:text-slate-400 text-xs font-medium mb-1.5 transition-colors duration-300">Message</label>
              <textarea 
                v-model="contactForm.message"
                required
                rows="4"
                placeholder="Tell me about your project..."
                class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/50 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:dark:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none duration-300"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              <Send class="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
