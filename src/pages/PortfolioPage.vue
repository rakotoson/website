<script setup>
import { ref, onMounted } from 'vue';
import { Mail, MapPin, GithubIcon, LinkedinIcon, Code, Server, Briefcase, GraduationCap, MessageCircle, Download, Sun, Moon, Phone } from 'lucide-vue-next';
import { skills, experience, contactInfo, education } from '@/data/portfolio';
import ContactModal from '@/components/ContactModal.vue';
import ExperienceSection from '@/components/ExperienceSection.vue';
import EducationSection from '@/components/EducationSection.vue';
import SkillsSection from '@/components/SkillsSection.vue';

const activeTab = ref('experience');
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
  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});

const tabs = [
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap }
];

const coreSkills = {
  languages: skills.languages,
  frameworks: skills.frameworks,
  databases: skills.databases
};

const startYear = 2017;
const currentYear = new Date().getFullYear();
const yearsOfExperience = currentYear - startYear;

const downloadResume = () => {
  // This will download the resume PDF from the public folder
  const link = document.createElement('a');
  link.href = '/cv_avotra.pdf';
  link.download = 'Avotra_Niaina_Rakotoson_Resume.pdf';
  link.click();
};
</script>

<template>
  <div class="min-h-screen lg:h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-x-hidden lg:overflow-hidden transition-colors duration-300">
    <!-- Floating Background Icons -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden opacity-5 dark:opacity-10 transition-opacity duration-300">
      <div class="absolute top-16 left-[8%] text-4xl md:text-5xl float-animation text-slate-400 dark:text-inherit">⚙️</div>
      <div class="absolute top-28 right-[12%] text-3xl md:text-4xl float-animation-reverse text-slate-400 dark:text-inherit">🚀</div>
      <div class="absolute top-[35%] left-[3%] text-3xl md:text-4xl float-animation-slow hidden sm:block text-slate-400 dark:text-inherit">💻</div>
      <div class="absolute top-[55%] right-[6%] text-4xl md:text-5xl float-animation hidden sm:block text-slate-400 dark:text-inherit">🔥</div>
      <div class="absolute bottom-40 left-[18%] text-3xl md:text-4xl float-animation-reverse hidden md:block text-slate-400 dark:text-inherit">⚡</div>
      <div class="absolute bottom-24 right-[22%] text-3xl md:text-4xl float-animation-slow hidden md:block text-slate-400 dark:text-inherit">🎯</div>
      <div class="absolute top-[22%] right-[38%] text-2xl md:text-3xl float-animation hidden lg:block text-slate-400 dark:text-inherit">📦</div>
      <div class="absolute bottom-[35%] left-[32%] text-2xl md:text-3xl float-animation-reverse hidden lg:block text-slate-400 dark:text-inherit">🛠️</div>
    </div>

    <!-- Theme Toggle -->
    <button
      @click="toggleTheme"
      class="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:scale-110 transition-all duration-300 group"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <Sun v-if="isDark" class="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform" />
      <Moon v-else class="w-5 h-5 text-slate-600 group-hover:-rotate-12 transition-transform" />
    </button>

    <!-- Main Content -->
    <div class="relative z-10 h-full max-w-9/10 mx-auto px-2 py-2 md:py-6 flex flex-col">
      <div class="flex-1 flex flex-col pb-2 lg:grid lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr] gap-8 min-h-0">

        <!-- Left Column - Profile -->
        <div class="flex flex-col items-center lg:items-start lg:justify-center text-center lg:text-left py-6 lg:py-0">
          <!-- Avatar with Gradient Ring -->
          <div class="mb-6 lg:mb-8">
            <div class="avatar-ring shadow-xl shadow-blue-500/10 dark:shadow-none">
              <div class="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-4xl md:text-5xl font-bold bg-clip-padding transition-colors duration-300">
                <span class="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">AR</span>
              </div>
            </div>
          </div>

          <!-- Name & Title -->
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">Avotra Niaina Rakotoson</h1>
          <p class="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text font-semibold text-base md:text-lg mb-3 lg:mb-4">Software Engineer</p>

          <!-- Animated Divider -->
          <div class="w-16 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4 lg:mb-5 shadow-sm"></div>

          <!-- Bio -->
          <div class="mb-6 lg:mb-8 max-w-sm">
            <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed transition-colors duration-300">
              <span class="text-2xl mr-1">🚀</span> Passionate developer with <span class="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text font-bold">{{ yearsOfExperience }}+ years</span> of experience crafting
            </p>
            <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mt-2 transition-colors duration-300">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-xs font-medium mr-1 transition-colors duration-300">
                <Code class="w-3 h-3" /> Scalable Systems
              </span>
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-xs font-medium transition-colors duration-300">
                <Server class="w-3 h-3" /> Team Leadership
              </span>
            </p>
            <p class="text-slate-500 dark:text-slate-500 text-xs md:text-sm mt-3 italic transition-colors duration-300">
              "Turning complex problems into elegant solutions"
            </p>
          </div>

          <!-- Contact Info -->
          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-6 lg:gap-3 mb-6 lg:mb-8">
            <a :href="`mailto:${contactInfo.email}`" class="group flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-all duration-300 text-sm">
              <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors duration-300">
                <Mail class="w-4 h-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              <span class="truncate">{{ contactInfo.email }}</span>
            </a>
            <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
              <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center transition-colors duration-300">
                <Phone class="w-4 h-4" />
              </div>
              <span>{{ contactInfo.phone }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
              <div class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center transition-colors duration-300">
                <MapPin class="w-4 h-4" />
              </div>
              <span>{{ contactInfo.location }}</span>
            </div>
          </div>

          <!-- Social Links & Action Buttons (Inline) -->
          <div class="flex items-center gap-2 flex-wrap">
            <button
              @click="showContactModal = true"
              class="get-in-touch-btn flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle class="w-4 h-4" />
              <span>Get In Touch</span>
            </button>
            <a href="https://github.com/rakotoson" target="_blank" rel="noopener noreferrer" class="social-btn w-10 h-10 lg:w-11 lg:h-11 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-center transition-colors duration-300" title="GitHub" aria-label="GitHub profile">
              <GithubIcon class="w-5 h-5 text-slate-500 dark:text-slate-400 transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/avotra-niaina-rakotoson-763a52165/" target="_blank" rel="noopener noreferrer" class="social-btn w-10 h-10 lg:w-11 lg:h-11 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-center transition-colors duration-300" title="LinkedIn" aria-label="LinkedIn profile">
              <LinkedinIcon class="w-5 h-5 text-slate-500 dark:text-slate-400 transition-colors" />
            </a>
            <button
              @click="downloadResume"
              class="download-resume-btn flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              title="Download Resume"
            >
              <Download class="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        <!-- Right Column - Content with Tabs -->
        <div class="flex flex-col min-h-0 flex-1">

            <!-- Core Skills Section (Always Visible) -->
           <SkillsSection :skills="coreSkills" />

           <!-- Tabs -->
           <div role="tablist" aria-label="Portfolio sections" class="flex gap-2 mb-4 lg:mb-5 flex-shrink-0 overflow-x-auto pb-2">
             <button
               v-for="tab in tabs"
               :key="tab.id"
               role="tab"
               :id="`tab-${tab.id}`"
               :aria-selected="activeTab === tab.id"
               :aria-controls="`panel-${tab.id}`"
               @click="activeTab = tab.id"
               :class="[
                 'tab-button flex items-center gap-2 lg:gap-2.5 px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-300',
                 activeTab === tab.id
                   ? 'active bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                   : 'bg-white dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700/50'
               ]"
             >
               <component :is="tab.icon" class="w-4 h-4 lg:w-4.5 lg:h-4.5" />
               {{ tab.label }}
             </button>
           </div>

           <!-- Tab Content (Scrollable) -->
           <div class="flex-1 overflow-y-auto min-h-0 pr-2 lg:pr-3 max-h-[45vh] lg:max-h-none custom-scrollbar">

             <!-- Experience Tab -->
             <div v-show="activeTab === 'experience'" id="panel-experience" role="tabpanel" aria-labelledby="tab-experience">
               <ExperienceSection :items="experience" />
             </div>

             <!-- Education Tab -->
             <div v-show="activeTab === 'education'" id="panel-education" role="tabpanel" aria-labelledby="tab-education">
               <EducationSection :items="education" />
             </div>

          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="text-center pt-3 lg:pt-3 border-t border-slate-200 dark:border-slate-800/60 flex-shrink-0 mt-3 lg:mt-0 transition-colors duration-300">
        <p class="text-slate-500 text-xs lg:text-sm">&copy; {{ new Date().getFullYear() }} <span class="font-medium animate-pulse">Avotra Niaina Rakotoson</span> · Built with <span class="text-red-500 dark:text-red-400">♥</span></p>
      </footer>
    </div>
  </div>

  <!-- Contact Modal Component -->
  <ContactModal :show="showContactModal" @close="showContactModal = false" />
</template>
