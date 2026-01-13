<script setup>
import { ref, computed } from 'vue'

const user = {
  id: 1,
  name: "Julian",
};

const chats = ref([
  { id: 1, name: "Janik" },
  { id: 2, name: "Pascal" },
  { id: 3, name: "Benjamin" },
]);

const activeChat = ref(chats.value[0])

const allMessages = {
  1: [
    { id: 1, userId: 1, userName: "Julian", content: "Hey Janik!", timestamp: "10:15" },
    { id: 2, userId: 2, userName: "Janik", content: "Hallo Julian", timestamp: "10:17" },
  ],
  2: [
    { id: 3, userId: 2, userName: "Pascal", content: "Yo!", timestamp: "11:00" },
  ],
  3: [
    { id: 4, userId: 3, userName: "Benjamin", content: "Hallo da", timestamp: "12:00" },
  ],
}

const messages = ref(allMessages[activeChat.value.id] || [])

function selectChat(chat) {
  activeChat.value = chat
  messages.value = allMessages[chat.id] || []
}

const newMessage = ref("")
function sendMessage() {
  if (!newMessage.value.trim()) return
  const newId = (messages.value[messages.value.length - 1]?.id || 0) + 1
  messages.value.push({
    id: newId,
    userId: user.id,
    userName: user.username,
    content: newMessage.value,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  newMessage.value = ""
}
</script>

<template>
  <div class="top">
    <h1>Direkt Chat</h1>
  </div>

  <div class="main-wrapper">
    <div class="side">
      <div
        v-for="chat in chats"
        :key="chat.id"
        :class="{ active: activeChat.id === chat.id }"
        class="channel-item"
        @click="selectChat(chat)"
      >
        {{ chat.name }}
      </div>
    </div>

    <div class="group-page">
      <div class="chat-container">
        <div v-for="msg in messages" :key="msg.id" :class="msg.userId === user.id ? 'own-message' : 'other-message'">
          <div class="messageInfo">
            <div class="sender">{{ msg.userName }}</div>
          </div>
          <div class="messageContent">{{ msg.content }}</div>
        </div>
      </div>

      <div class="message-input">
          <input type="text" v-model="newMessage" placeholder="Schreibe eine Nachricht..." @keyup.enter="sendMessage" />
          <button @click="sendMessage">Senden</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
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
  justify-content: flex-end;
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

/* Textfeld */
.form-group {
  margin-top: 12px;
  display: flex;
}

.form-group input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  background: #f3f3f3;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
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
</style>
