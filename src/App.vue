<template>
  <div class="flex h-screen overflow-hidden relative">
    <!-- Mobile Menu Button -->
    <button
      @click="sidebarOpen = !sidebarOpen"
      class="fixed top-4 left-4 z-50 lg:hidden bg-gray-900 p-2 rounded-lg border border-gray-700 hover:border-primary transition-colors"
      :class="{ 'left-[21rem]': sidebarOpen }"
    >
      <svg v-if="!sidebarOpen" class="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <div
      :class="[
        'transition-transform duration-300 ease-in-out z-40',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'fixed lg:static inset-y-0 left-0'
      ]"
    >
      <TemplateSidebar
        :selected-template-id="selectedTemplate?.id"
        @select-template="handleSelectTemplate"
      />
    </div>

    <!-- Main Content -->
    <MemeEditor 
      :template="selectedTemplate"
      :initial-text-lines="initialTextLines"
      @select-template="selectTemplate"
      @next-template="navigateToNextTemplate"
      @prev-template="navigateToPrevTemplate"
      class="flex-1"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import TemplateSidebar from './components/TemplateSidebar.vue';
import MemeEditor from './components/MemeEditor.vue';
import { API_ENDPOINTS } from './config/api';

const selectedTemplate = ref(null);
const sidebarOpen = ref(false);
const templates = ref([]);
const initialTextLines = ref([]);
const templatesLoaded = ref(false);

const selectTemplate = (template, textLines = null) => {
  selectedTemplate.value = template;
  initialTextLines.value = textLines || [];
};

const handleSelectTemplate = (template) => {
  selectTemplate(template);
  // Close sidebar on mobile after selection
  sidebarOpen.value = false;
};

// Deduplicate templates by ID (same logic as sidebar)
const uniqueTemplates = computed(() => {
  const seen = new Map();
  templates.value.forEach(template => {
    if (!seen.has(template.id)) {
      seen.set(template.id, template);
    }
  });
  return Array.from(seen.values());
});

// Navigate to next template
const navigateToNextTemplate = () => {
  if (!selectedTemplate.value || uniqueTemplates.value.length === 0) return;
  
  const currentIndex = uniqueTemplates.value.findIndex(
    t => t.id === selectedTemplate.value.id
  );
  
  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % uniqueTemplates.value.length;
    selectedTemplate.value = uniqueTemplates.value[nextIndex];
  }
};

// Navigate to previous template
const navigateToPrevTemplate = () => {
  if (!selectedTemplate.value || uniqueTemplates.value.length === 0) return;
  
  const currentIndex = uniqueTemplates.value.findIndex(
    t => t.id === selectedTemplate.value.id
  );
  
  if (currentIndex !== -1) {
    const prevIndex = currentIndex === 0 
      ? uniqueTemplates.value.length - 1 
      : currentIndex - 1;
    selectedTemplate.value = uniqueTemplates.value[prevIndex];
  }
};

// Parse URL hash to load template and text
const parseUrlAndLoadTemplate = () => {
  const hash = window.location.hash.slice(1); // Remove #
  if (!hash || hash === '/' || !templatesLoaded.value) return;
  
  const parts = hash.split('/').filter(p => p);
  if (parts.length === 0) return;
  
  const templateId = parts[0];
  const textLines = parts.slice(1).map(text => decodeURIComponent(text).replace(/_/g, ' '));
  
  // Find template by ID
  const template = uniqueTemplates.value.find(t => t.id === templateId);
  if (template) {
    selectTemplate(template, textLines.length > 0 ? textLines : null);
  }
};

// Handle browser back/forward buttons
const handlePopState = () => {
  parseUrlAndLoadTemplate();
};

// Fetch templates on mount
const fetchTemplates = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.templates);
    templates.value = response.data;
    templatesLoaded.value = true;
    
    // Parse URL after templates are loaded
    parseUrlAndLoadTemplate();
  } catch (error) {
    console.error('Error fetching templates:', error);
  }
};

onMounted(() => {
  fetchTemplates();
  // Listen for browser back/forward buttons
  window.addEventListener('popstate', handlePopState);
});
</script>

