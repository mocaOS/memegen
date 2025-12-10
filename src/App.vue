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
      @select-template="selectTemplate"
      class="flex-1"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TemplateSidebar from './components/TemplateSidebar.vue';
import MemeEditor from './components/MemeEditor.vue';

const selectedTemplate = ref(null);
const sidebarOpen = ref(false);

const selectTemplate = (template) => {
  selectedTemplate.value = template;
};

const handleSelectTemplate = (template) => {
  selectTemplate(template);
  // Close sidebar on mobile after selection
  sidebarOpen.value = false;
};
</script>

