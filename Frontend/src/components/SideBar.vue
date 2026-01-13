<script setup>

</script>
<template>
  <div class="left-bar">
    <router-link to="/" class="icon">
      <img src="@/assets/group.svg" alt="Gruppen" />
    </router-link>
    <router-link to="/direct-message" class="icon">
      <img src="@/assets/chat.svg" alt="Chat" />
    </router-link>

  </div>
</template>

<style scoped>
.left-bar {
  position: fixed;
  top: 70px; /* unter Top-Bar */
  left: 0;
  width: 90px;
  height: calc(100% - 70px);
  background-color: #6264a7;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px; /* Abstand zwischen Icons */
  padding-top: 20px;
  border-right: 1px solid white;
  z-index: 999;
}

.left-bar .icon img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

</style>