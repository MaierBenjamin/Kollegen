<script setup>

</script>



<template>
  <div class="home-view">
    <img class="settings-icon" src="@/assets/settings.svg" alt="Settings" />        

    <div class="gruppen-card">
      <h2>Gruppe 1</h2>
      <img class="ellipsis-icon" src="@/assets/ellipsis.svg" alt="Ellipsis" />
    </div>
  </div>
</template>

<style scoped>
.home-view {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e2e3ff;
}

.settings-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  max-width: 48px;
  height: auto;
  cursor: pointer;
}

.gruppen-card {
  background: #e7e7ff;
  border-radius: 20px;
  width: min(800px, 90%);
  padding: 20px 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);

  display: flex;
  align-items: center;
  justify-content: space-between; /* Text links, Punkte rechts */
}

.ellipsis-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
