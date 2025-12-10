<template>
  <div class="flex h-screen overflow-hidden">
    <TemplateSidebar
      :selected-template-id="selectedTemplate?.id"
      @select-template="selectTemplate"
    />
    <MemeEditor 
      :template="selectedTemplate"
      @select-template="selectTemplate"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TemplateSidebar from './components/TemplateSidebar.vue';
import MemeEditor from './components/MemeEditor.vue';

const selectedTemplate = ref(null);

const selectTemplate = (template) => {
  selectedTemplate.value = template;
};
</script>

