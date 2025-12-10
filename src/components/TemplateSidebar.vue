<template>
  <div class="w-80 sm:w-80 bg-gray-950 border-r border-gray-800 flex flex-col h-screen">
    <!-- Header -->
    <div class="p-4 border-b border-gray-800">
      <h1 class="text-lg sm:text-xl font-bold text-primary">Art DeCC0s</h1>
      <p class="text-xs sm:text-sm text-gray-400 mt-1">Meme Generator</p>
    </div>

    <!-- Search -->
    <div class="p-4 border-b border-gray-800">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search templates..."
        class="input-field text-sm"
      />
    </div>

    <!-- Templates List -->
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="loading" class="text-center text-gray-500 py-8">
        Loading templates...
      </div>
      
      <div v-else-if="error" class="text-center text-red-400 py-8">
        {{ error }}
      </div>
      
      <div v-else class="space-y-2">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          @click="$emit('select-template', template)"
          :class="['template-card', { active: selectedTemplateId === template.id }]"
        >
          <div class="flex items-center space-x-3">
            <img
              :src="template.blank"
              :alt="template.name"
              class="w-20 h-20 object-cover rounded bg-gray-900 flex-shrink-0"
              loading="lazy"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-sm leading-tight line-clamp-2">{{ template.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Info -->
    <div class="p-4 border-t border-gray-800 text-xs text-gray-500">
      <p>{{ templates.length }} templates available</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const props = defineProps({
  selectedTemplateId: String,
});

defineEmits(['select-template']);

const templates = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');

const filteredTemplates = computed(() => {
  if (!searchQuery.value) return templates.value;
  
  const query = searchQuery.value.toLowerCase();
  return templates.value.filter(template => 
    template.name.toLowerCase().includes(query) ||
    template.id.toLowerCase().includes(query)
  );
});

const fetchTemplates = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await axios.get(API_ENDPOINTS.templates);
    templates.value = response.data;
  } catch (err) {
    error.value = 'Failed to load templates';
    console.error('Error fetching templates:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTemplates();
});
</script>

