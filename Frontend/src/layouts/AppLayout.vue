<template>
    <NavBar />
    <div class="main-content">
      <SideBar />
      <div class="router-wrapper">
        <router-view />
      </div>
    </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"
</script>

<style scoped>
.main-content {
  display: flex;
  height: 100%;
  background-color: #e2e3ff;
}
</style>
