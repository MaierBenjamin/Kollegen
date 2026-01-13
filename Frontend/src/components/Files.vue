<script setup>
import { ref, watch } from 'vue'

defineProps({
  channelId: { type: Number, required: true }
})

const files = ref([])

const allFiles = {
  1: [{ id: 1, name: "report.pdf", path: "/groups/channel1/files/report.pdf" }],
  2: [{ id: 2, name: "presentation.pptx", path: "/groups/channel2/files/presentation.pptx" }],
  3: [{ id: 3, name: "diagram.png", path: "/groups/channel3/files/diagram.png" }],
  4: []
}

watch(() => channelId, (newId) => {
  files.value = allFiles[newId] || []
}, { immediate: true })

function download(file) {
  const link = document.createElement("a")
  link.href = file.path
  link.download = file.name
  link.click()
}
</script>

<template>
  <div class="files">
    <div v-if="files.length">
      <div v-for="file in files" :key="file.id">
        {{ file.name }} <button @click="download(file)">Download</button>
      </div>
    </div>
    <div v-else>Keine Dateien in diesem Channel.</div>
  </div>
</template>

