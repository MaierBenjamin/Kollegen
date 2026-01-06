<script setup>

const groups = ["Gruppe 1", "Gruppe 2" , "Gruppe 3", "Gruppe 4", "Gruppe 5", "Gruppe 6", "Gruppe 7", "Gruppe 8", "Gruppe 9", "Gruppe 10"] 

</script>



 
 
<template>
  <div class="home-view">
    <img class="plus-icon" src="@/assets/circle-plus.svg" alt="Plus" @click="$router.push('/new-group')"/>        

    <div class="gruppen-card" v-for="group in groups">
      <h2>{{ group }}</h2>

    </div>

  </div>
</template>
 
 
 
<style>
.home-view {
  width: 100%;
  min-height: 100%;     /* füllt den content-bereich */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;    /* statt margin-top */
  background: transparent; /* background kommt aus .content */
}


.router-wrapper {
  width: 100%;
  display: block;
}
 
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #e2e3ff;
}


.plus-icon {
  position: absolute;
  padding: 20px 30px;
  margin-bottom: 10px; /* Adjusted to align with the first card */
  right: 16px;
  max-width: 48px;
  height: auto;
  cursor: pointer;
}

.gruppen-card {
  background: #e7e7ff;
  border-radius: 20px;

  width: min(700px, 70%); /* <- statt 30% */
  padding: 28px 40px;
  margin-bottom: 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 2px solid black;
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
