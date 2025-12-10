<template>
  <div class="flex-1 flex flex-col bg-black">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
      <button
        v-if="template"
        @click="goBack"
        class="text-gray-400 hover:text-primary transition-colors duration-200"
        title="Back to landing page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <p v-if="template" class="text-gray-100">{{ template.name }}</p>
      <p v-else class="text-gray-500">Select a template to get started</p>
      
      <!-- Discord Link -->
      <a
        href="https://discord.com/invite/Rs7wxUTrWV"
        target="_blank"
        rel="noopener noreferrer"
        class="ml-auto text-sm text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Share memes on Discord
      </a>
    </div>

    <!-- Main Content -->
    <div v-if="template" class="flex-1 overflow-y-auto p-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Meme Preview -->
          <div class="lg:col-span-3">
            <div class="bg-gray-900 rounded-lg p-6 border border-gray-800 relative">
              <img
                v-show="!initialLoading"
                :src="memeUrl"
                :alt="template.name"
                class="w-full rounded"
                @load="handleImageLoad"
                @error="imageError = true"
              />
              <div v-if="initialLoading && !imageError" class="w-full min-h-[400px] bg-gray-800 rounded flex items-center justify-center">
                <div class="text-gray-600">
                  <svg class="w-12 h-12 animate-spin mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
              <div v-if="imageError" class="w-full min-h-[400px] bg-gray-800 rounded flex items-center justify-center text-gray-500">
                Failed to load image
              </div>
            </div>
          </div>

          <!-- Text Editor -->
          <div class="lg:col-span-2 space-y-4">
            <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Text Lines</h3>
            <div class="space-y-3">
              <div v-for="(line, index) in textLines" :key="index">
                <label :for="`line-${index}`" class="block text-sm font-medium text-gray-400 mb-1">
                  Line {{ index + 1 }}
                </label>
                <input
                  :id="`line-${index}`"
                  v-model="textLines[index]"
                  type="text"
                  :placeholder="`Enter text for line ${index + 1}...`"
                  class="input-field"
                  @input="debouncedUpdateMeme"
                />
              </div>
              
              <div v-if="textLines.length === 0" class="text-gray-500 text-sm">
                This template has no text lines.
              </div>
            </div>

            <!-- Template Info -->
            <div class="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
              <h4 class="text-sm font-semibold text-gray-400 mb-2">Template Info</h4>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>Lines: {{ template.lines }}</li>
                <li>ID: {{ template.id }}</li>
                <li>
                  <a :href="template.blank" target="_blank" download class="text-primary hover:underline">
                    Download Empty Template
                  </a>
                </li>
              </ul>
            </div>

            <!-- Download Button -->
            <button
              @click="downloadMeme"
              class="btn-primary w-full"
              :disabled="downloading"
            >
              {{ downloading ? 'Downloading...' : 'Download Meme' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Landing Page with Random Template -->
    <div v-else class="flex-1 flex items-center justify-center p-6">
      <div class="max-w-2xl w-full">
        <div v-if="randomTemplate" class="space-y-6">
          <!-- Template Name -->
          <div class="text-center">
            <h3 class="text-xl font-semibold">{{ randomTemplate.name }}</h3>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              @click="fetchRandomTemplate"
              class="btn-secondary flex-1"
              :disabled="loadingRandom"
            >
              {{ loadingRandom ? 'Loading...' : 'Random Template' }}
            </button>
            <button
              @click="selectRandomTemplate"
              class="btn-primary flex-1"
            >
              Select Template
            </button>
          </div>
          
          <!-- Random Template Preview -->
          <div class="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <img
              :src="randomTemplate.example.url"
              :alt="randomTemplate.name"
              class="w-full rounded"
            />
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-else class="text-center text-gray-500">
          <div class="w-full aspect-square bg-gray-800 rounded-lg animate-pulse mb-4"></div>
          <p>Loading random template...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';

const props = defineProps({
  template: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['select-template']);

const textLines = ref([]);
const initialLoading = ref(true);
const imageError = ref(false);
const downloading = ref(false);
const randomTemplate = ref(null);
const loadingRandom = ref(false);
let debounceTimer = null;

// Generate meme URL based on template and text
const memeUrl = computed(() => {
  if (!props.template) return '';
  
  // If no text or all empty, show the blank template
  if (textLines.value.every(line => !line.trim())) {
    return props.template.blank;
  }
  
  // Build the text path with URL encoding
  const textPath = textLines.value
    .map(line => encodeURIComponent(line || '_'))
    .join('/');
  
  return `${API_BASE_URL}/images/${props.template.id}/${textPath}.png`;
});

// Watch for template changes
watch(() => props.template, (newTemplate) => {
  if (newTemplate) {
    // Initialize text lines with example text or empty strings
    const exampleText = newTemplate.example?.text || [];
    textLines.value = Array(newTemplate.lines)
      .fill('')
      .map((_, i) => exampleText[i] || '');
    
    // Only show loading spinner when switching templates
    initialLoading.value = true;
    imageError.value = false;
  }
}, { immediate: true });

// Handle image load
const handleImageLoad = () => {
  initialLoading.value = false;
};

// Debounced update to avoid too many URL changes
const debouncedUpdateMeme = () => {
  // Just debounce, don't reset loading states
  // The memeUrl computed property will handle the URL change
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    // Trigger reactive update
  }, 300);
};

// Download meme
const downloadMeme = async () => {
  try {
    downloading.value = true;
    
    // Fetch the image as blob
    const response = await fetch(memeUrl.value);
    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.template.id}-meme.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading meme:', error);
    alert('Failed to download meme. Please try again.');
  } finally {
    downloading.value = false;
  }
};

// Fetch random template for landing page
const fetchRandomTemplate = async () => {
  try {
    loadingRandom.value = true;
    const response = await axios.get(API_ENDPOINTS.templates);
    const templates = response.data;
    
    // Filter templates that have example URLs
    const templatesWithExamples = templates.filter(t => t.example && t.example.url);
    
    if (templatesWithExamples.length > 0) {
      const randomIndex = Math.floor(Math.random() * templatesWithExamples.length);
      randomTemplate.value = templatesWithExamples[randomIndex];
    }
  } catch (error) {
    console.error('Error fetching random template:', error);
  } finally {
    loadingRandom.value = false;
  }
};

// Select the random template
const selectRandomTemplate = () => {
  if (randomTemplate.value) {
    emit('select-template', randomTemplate.value);
  }
};

// Go back to landing page
const goBack = () => {
  emit('select-template', null);
  // Fetch a new random template for the landing page
  fetchRandomTemplate();
};

// Load random template on mount (only if no template is selected)
onMounted(() => {
  if (!props.template) {
    fetchRandomTemplate();
  }
});
</script>

