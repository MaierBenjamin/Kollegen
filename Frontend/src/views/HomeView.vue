<script setup>
import router from '@/router';


const groups = []

const group = ({
  id: 1,
  name: "Gruppe 1",
  organizationId: 1,
})

const group2 = ({
  id: 2,
  name: "Gruppe 2",
  organizationId: 1,
})

const group3 = ({
  id: 3,
  name: "Gruppe 3",
  organizationId: 1,
})

groups.push(group)
groups.push(group2)
groups.push(group3)

</script>



 
 
<template>
  <div class="home-view">
    <img class="settings-icon" src="@/assets/settings.svg" alt="Settings" />        
    <div class="gruppen-card" v-for="group in groups" @click="router.push({ name: 'Group', params: { id: group.id  } })
">
      <h2>{{ group.name }}</h2>

    </div>

  </div>
</template>
 
 
 
<style scoped>

  
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
