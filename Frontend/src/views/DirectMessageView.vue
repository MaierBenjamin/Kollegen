<script setup>
import { ref, computed, nextTick, watch } from 'vue'

const user = {
  id: 1,
  name: 'Julian',
}

const chats = ref([
  { id: 1, name: 'Janik' },
  { id: 2, name: 'Pascal' },
  { id: 3, name: 'Benjamin' },
])

const activeChat = ref(chats.value[0])

const allMessages = {
  1: [
    { id: 1, userId: 1, userName: 'Julian', content: 'Hey Janik!', timestamp: '10:15' },
    { id: 2, userId: 2, userName: 'Janik', content: 'Hallo Julian', timestamp: '10:17' },
  ],
  2: [{ id: 3, userId: 2, userName: 'Pascal', content: 'Yo😽', timestamp: '11:00' }],
  3: [{ id: 4, userId: 3, userName: 'Benjamin', content: 'Hallo da', timestamp: '12:00' }],
}

const messages = ref(allMessages[activeChat.value.id] || [])
const newMessage = ref('')

function selectChat(chat) {
  activeChat.value = chat
  messages.value = allMessages[chat.id] || []
  nextTick(scrollToBottom)
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  const newId = (messages.value[messages.value.length - 1]?.id || 0) + 1
  messages.value.push({
    id: newId,
    userId: user.id,
    userName: user.name,
    content: newMessage.value,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  })
  newMessage.value = ''
  nextTick(scrollToBottom)
}

const chatRef = ref(null)
function scrollToBottom() {
  if (!chatRef.value) return
  chatRef.value.scrollTop = chatRef.value.scrollHeight
}

watch(activeChat, () => nextTick(scrollToBottom))
</script>

<template>
  <div class="chat-layout">
    <aside class="sidebar">
      <div class="sidebar-header">Direkt Chat</div>
      <div
        v-for="chat in chats"
        :key="chat.id"
        class="channel-item"
        :class="{ active: activeChat.id === chat.id }"
        @click="selectChat(chat)"
      >
        <span class="avatar">{{ chat.avatar }}</span>
        <span class="name">{{ chat.name }}</span>
      </div>
    </aside>

    <section class="chat-section">
      <div class="chat-header">
        <div class="chat-user">
          <span class="username">{{ activeChat.name }}</span>
        </div>
      </div>

      <div class="chat-container" ref="chatRef">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message"
          :class="msg.userId === user.id ? 'own' : 'other'"
        >
          <div class="bubble">
            <div class="content">{{ msg.content }}</div>
            <div class="meta">{{ msg.userName }}</div>
          </div>
        </div>
      </div>

      <div class="message-input">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Schreib eine Nachricht"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Senden</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  height: 100%;
  background: #fff;
  color: black;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.sidebar {
  width: 260px;
  background: var(--background2);
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 20px;
  font-weight: 700;
  font-size: 20px;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 8px;
  margin: 4px 8px;
}

.channel-item:hover {
  background: #e5e7eb;
}

.channel-item.active {
  background-color: #d0d0ff;
  font-weight: bold;
}



.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.avatar.big {
  font-size: 26px;
}

.chat-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.message {
  display: flex;
}

.message.own {
  justify-content: flex-end;
}

.message.other {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 12px;
  line-height: 1.4;
}

.message.own .bubble {
  background-color: #e2e3ff;
  color: black;
  border-radius: 12px 12px 0 12px;
}

.message.other .bubble {
  background-color: #e5e7eb;
  color: black;
  border-radius: 12px 12px 12px 0;
}

.content {
  font-size: 17px;
  word-break: break-word;
  white-space: pre-wrap;
}

.meta {
  margin-top: 4px;
  font-size: 13px;
  opacity: 0.7;
  text-align: right;
}

.message-input {
  margin-top: 12px;
  padding: 12px 20px 16px 20px;
  display: flex;
  gap: 8px;
}

.message-input input {
  flex: 1;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  background: #f3f3f3;
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