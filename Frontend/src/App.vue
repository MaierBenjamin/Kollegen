<script setup>
import { RouterView } from 'vue-router';
import router from './router';
import NavBar from './components/NavBar.vue';
import HomeView from './views/HomeView.vue';
import SideBar from './components/SideBar.vue';

</script>

<template>
  <NavBar/>
  <div class="main-content">
    <SideBar/>
    <div class="router-wrapper"><RouterView /></div>
  </div>

</template>
<style lang="scss" scoped>
.main-content {
  display: flex;
  // max-height: calc(100% - 70px);
  height: 100%  ;
  background-color: #e2e3ff;
  

}
</style>
