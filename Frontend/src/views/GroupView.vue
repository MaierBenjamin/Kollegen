<script setup>
import { ref } from 'vue'

const group3 = ref({
  id: 3,
  name: "Gruppe 3",
  organizationId: 1,
  channels: {
    channel1: {
      channelId: 1,
      channelName: "Allgemein"
    },
    channel2: {
      channelId: 2,
      channelName: "Kanal 2"
    },
    channel3: {
      channelId: 3,
      channelName: "Kanal 3"
    },
    channel4: {
      channelId: 3,
      channelName: "Allgemein 2"
    },
    
  }
})
</script>


<template>

<div class="top">
  <h1>{{ group3.name }}</h1>
  <h2>Chat</h2>
  <h2>Medien</h2>
  <img class="settings-icon" src="@/assets/settings.svg" alt="Settings" />        
</div>

<div class="main-wrapper">
  <div class="side">
    <div v-for="channel in group3.channels" :key="channel.channelId" class="channel-item">
      <h2>{{ channel.channelName }}</h2>
    </div>
  </div>
  <div class="group-page">
    <!-- Content hier -->
  </div>
</div>

   <div class="form-group">
      <input v-model="searchtext" placeholder="Suchen" />
    </div>

</template>



<style>

.form-group {
  flex: 1;
  display: flex;
  justify-content: center;

  input {
    width: 50%;
    padding: 14px 18px;
    border-radius: 20px;
    border: none;
    background: #f3f3f3;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
}

body, html, #app {
  margin: 0;
  padding: 0;
  font-family: var(--font);
  background: #fff;
  height: 100%;
  width: 100%;
}

.top {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  background-color: var(--background2);
  padding: 1rem 2rem;
}

.settings-icon {
  margin-left: auto;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.main-wrapper {
  display: flex;
  min-height: 83.4%;
}

.side {
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 0vh;
  background-color: var(--background2);
  padding: 1rem;
}

.channel-item {
  margin-bottom: 1rem;
}

.group-page {
  flex: 1; 
  background: #fff;
  padding: 1rem;
  
}

</style>