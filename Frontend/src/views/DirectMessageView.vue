<script setup>
import Chat from '@/components/Chat.vue';
import { ref } from 'vue'

const user = {
  id: 1,
  name: "Julian",
};

const chats = ref([
  {
    id: 1,
    name: "Janik",
  },
  {
    id: 2,
    name: "Pascal",
  },
  {
    id: 3,
    name: "Benjamin",
  },
]);
  
</script>


<template>

<div class="top">
  <h1>Chat</h1>
    <div>
    <div class="tabs">
      <h2>
        {{user.name}}
      </h2>
    </div>
  </div>
</div>

<div class="main-wrapper">
  <div class="side">
    <div v-for="chat in chats" :key="chat.id" class="channel-item">
      <h4>{{ chat.name }}</h4>
    </div>
  </div>
  <div class="group-page">
    <div>
        <Chat/>
    </div>
</div>
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

.tabs {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.message-card {
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
  flex-direction: row;
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
  display: flex;
  flex-direction: column;
  
}

.group-page {
  flex: 1; 
  background: #fff;
  padding: 1rem;
  
}

</style>