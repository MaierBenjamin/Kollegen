<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="router-wrapper"><RouterView /></div>

</template>
<style scoped>
.body {
  margin: 0;
  padding: 0;
  background-color: var(--background);
  font-family: inherit;
  height: 100%; 
  width: 100%;
}

.router-wrapper {
  overflow-y: auto;
  max-height: 100%;
}

#app {
  padding-top: 600px; /* Platz für Navbar */
  box-sizing: border-box; /* damit Padding nicht die Größe kaputt macht */
}
</style>
