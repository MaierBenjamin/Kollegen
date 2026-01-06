<template>
  <div class ="layout">
    <NavBar />
    <div class="main-content">
      <SideBar />
      <div class="router-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"
</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-content {
  flex: 1;
  display: flex;
  background-color: #e2e3ff;
}

.router-wrapper {
  flex: 1;
  overflow-y: auto;
}


</style>
