<template>
  <div class="layout">
    <NavBar />
    <SideBar />
    <main class="main-content">
      <div class="router-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue"
import SideBar from "@/components/SideBar.vue"
</script>

<style scoped>
/* Gesamt-Layout */
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* verhindert Body-Scroll */
}

/* Main Content */
.main-content {
  margin-top: 70px;      /* Höhe Top-Bar */
  margin-left: 90px;     /* Breite Sidebar */
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: #e2e3ff;
  padding: 20px;
}

/* Router-View Scrollbereich */
/* .router-wrapper {
  flex: 1;
  overflow-y: auto;
} */
</style>
