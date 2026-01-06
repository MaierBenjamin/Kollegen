<script setup>
const groups = ["Gruppe 1", "Gruppe 2", "Gruppe 3", "Gruppe 4", "Gruppe 5", "Gruppe 6", "Gruppe 7", "Gruppe 8", "Gruppe 9", "Gruppe 10"];
</script>

<template>
  <div class="home-view">
    <img
      class="plus-icon"
      src="@/assets/circle-plus.svg"
      alt="Plus"
      @click="$router.push('/new-group')"
    />

    <div
      class="gruppen-card"
      v-for="group in groups"
      :key="group"
      @click="$router.push('/group-view')"
    >
    <div class="gruppen-card" v-for="group in groups" @click="$router.push('/group-view')">
      <h2>{{ group }}</h2>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  position: relative;   /* wichtig für plus-icon */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  background: transparent;
}

.plus-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  cursor: pointer;
}

.gruppen-card {
  background: #e7e7ff;
  border-radius: 20px;

  width: min(700px, 70%);
  padding: 28px 40px;
  margin-bottom: 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 2px solid black;
}

.gruppen-card:hover {
  filter: brightness(0.9);
}
</style>
