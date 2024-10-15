<script lang="ts" setup>
import { computed } from 'vue';
import { useMixingLetters } from '../composables/useMixingLetters';
import { useReadFile } from '../composables/useReadFile';

const { fileContent, handleFileUpload } = useReadFile();

const fileContentLines = computed<string[]>(() => fileContent.value ? fileContent.value.split('\n') : []);
const convertFileContent = computed(() => {
  return fileContentLines.value.map(line => useMixingLetters(line)).join('\n');
});

</script>

<template>
  <div>
    <h3>Upload file</h3>
    <input type="file" @change="handleFileUpload" accept=".txt" />
    <div v-if="fileContent">
      <h4>File Content:</h4>
      <pre>{{ fileContent }}</pre>

      <h4>Convert File Content</h4>
      <pre>{{ convertFileContent }}</pre>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
