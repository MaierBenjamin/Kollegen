<script setup>
import { getGroup } from '@/api/routes/groups'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const activeTab = ref('chat')
const route = useRoute()
const group = ref({})

const activeChannel = ref()
function selectChannel(channel) {
  activeChannel.value = channel
}

// const messages = computed(() => allMessages[activeChannel.value.channelId] || [])

const user = { id: 1, username: "User" }

const newMessage = ref("")
function sendMessage() {
  if (!newMessage.value.trim()) return
  messages.value.push({
    userId: user.id,
    userName: user.username,
    content: newMessage.value,
  })
  newMessage.value = ""
}

function download(file) {
  const link = document.createElement("a")
  link.href = file.path
  link.download = file.name
  link.click()
}

onMounted(async () => {
  const groupResponse = await getGroup(route.params.id) 

  if (groupResponse.success) {
    group.value = groupResponse.group
  }
})
</script>

<template>
  <div class="top">
    <h1>{{ group.name }}</h1>
    <div class="tabs">
      <h2 :class="{ active: activeTab === 'chat' }" @click="activeTab = 'chat'">Chat</h2>
      <img
        class="plus-icon"
        src="@/assets/settings.svg"
        alt="Plus"
        @click="$router.push('/group-settings')"        
        />
    </div>
  </div>

  <div class="main-wrapper">
    <div class="side">
      <div
        v-for="channel in group.channels"
        :key="channel.channelId"
        class="channel-item"
        @click="selectChannel(channel)"
      >
        {{ channel.channelName }}
      </div>
    </div>

    <div class="group-page">
      <div v-if="activeTab === 'chat'">
        <div class="chat-container">
          <div v-for="msg in messages" :key="msg.id" :class="msg.userId === user.id ? 'own-message' : 'other-message'">
            <div class="messageInfo">
              <div class="sender">{{ msg.userName }}</div>
              <div class="messageDate">{{ msg.timestamp }}</div>
            </div>
            <div class="messageContent">{{ msg.content }}</div>
          </div>
        </div>
        <div class="message-field">
          <div class="message-input">
            <input type="text" v-model="newMessage" placeholder="Schreibe eine Nachricht..." @keyup.enter="sendMessage" />
            <button @click="sendMessage">Senden</button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'files'">
        <div v-if="files.length">
          <div v-for="file in files" :key="file.id">
            {{ file.name }} <button @click="download(file)">Download</button>
          </div>
        </div>
        <div v-else>Keine Dateien in diesem Channel.</div>

        <input type="file" @change="uploadFile" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  cursor: pointer;
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
  justify-content: flex-end;
}
.main-wrapper {
  display: flex;
  min-height: 83.4%;
}

.side {
  display: flex;
  flex-direction: column;
  width: 15%;
  background-color: var(--background2);
  padding: 1rem;
  cursor: pointer;
}

.channel-item {
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 8px;
}

.channel-item.active {
  background-color: #d0d0ff;
  font-weight: bold;
}

.group-page {
  flex: 1;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  overflow-y: auto;
}

.own-message {
  align-self: flex-end;
  background-color: #e2e3ff;
  color: black;
  padding: 8px 12px;
  border-radius: 12px 12px 0 12px;
  max-width: 70%;
}

.other-message {
  align-self: flex-start;
  background-color: #e5e7eb;
  color: black;
  padding: 8px 12px;
  border-radius: 12px 12px 12px 0;
  max-width: 70%;
}

.messageInfo {
  display: flex;
  gap: 10px;
}

.sender {
  font-size: 14px;
}

.messageDate {
  font-size: 13px;
}

.messageContent {
  font-size: 17px;
  word-break: break-word;     
  white-space: pre-wrap;        
}


.message-input {
  margin-top: 12px;
  display: flex;
  gap: 6px;
}

.message-input input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  background: #f3f3f3;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.message-input button {
  padding: 14px 20px;
  border-radius: 20px;
  border: none;
  background-color: #e2e3ff;
  cursor: pointer;
  font-weight: bold;
}

.message-field{
  flex: 1;
  background: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  
}


</style>
