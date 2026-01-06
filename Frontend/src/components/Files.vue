<template>
  <div class="files-view">
    <div>
      <div v-for="file in files" :key="file.id">
        {{ file.name }}
                <button @click="download(file)">Download</button>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      files: [
        { id: 1, name: "report.pdf", path: "/groups/channel/files/report.pdf" },
        { id: 2, name: "image.png", path: "/groups/channel/files/image.png" },
        { id: 3, name: "presentation.pptx", path: "/groups/channel/files/presentation.pptx" },
      ],
    };
  },
  /*
  async mounted() {
    try {
      const response = await fetch("/groups/channel/files");
      const data = await response.json();
      this.files = data;
    } catch (err) {
      console.error("Fehler beim Laden der Dateien:", err);
    }
  },
  */
  methods: {
    download(file) {
      const link = document.createElement("a");
      link.href = file.path;
      link.download = file.name;
      link.click();
    },
  },
};
</script>
