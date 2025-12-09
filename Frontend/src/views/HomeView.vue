<script setup>

const groups = ["Gruppe 1", "Gruppe 2", "Gruppe 3", "Gruppe 4", "Gruppe 5"] 

</script>



 
 
<template>
  <div class="home-view">
    <img class="settings-icon" src="@/assets/settings.svg" alt="Settings" />        

    <div class="gruppen-card" v-for="group in groups">
      <h2>{{ group }}</h2>

    </div>

  </div>
</template>
 
 
 
<style lang="scss" scoped>
.home-view {
  margin-top: 3%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  display: flex;
  flex-direction: row;
  background: #e7e7ff;
  border-radius: 20px;
  width: 30%;
  padding: 20px 30px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  border: solid black;
}

.gruppen-card:hover
{
  filter: brightness(0.9);
}

.ellipsis-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
