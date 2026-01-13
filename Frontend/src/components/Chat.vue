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

const user = {
  id: 1,
  username: "User",
};

const messages = [
  {
    id: 1,
    userId: 2,
    userName: "benjamin",
    content: "Hallo",
    timestamp: "2026-01-06T10:15:00Z",
  },
  {
    id: 2,
    userId: 1,
    userName: "pascal",
    content: "Wie gehts euch",
    timestamp: "2026-01-06T10:17:00Z",
  },
  {
    id: 3,
    userId: 3,
    userName: "janik",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timestamp: "2026-01-06T10:20:00Z",
  },
];

</script>

<template>

    <div
        v-for="message in messages"
        :key="message.id"
        :class="message.userId === user.id ? 'own-message' : 'other-message'"
        >
        <div class="messageInfo">
            <div class="sender">{{ message.userName }}</div>
            <div class="messageDate">{{ message.timestamp }}</div>
        </div>
        <div class="messageContent">{{ message.content }}</div>
    </div>

</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  max-width: 500px;
  margin: 0 auto;
}

.chat-container > div {
  display: inline-block;
}

.own-message {
  align-self: flex-end;
  background-color: #e2e3ff;
  color: white;
  padding: 8px 12px;
  border-radius: 12px 12px 0 12px;
  max-width: 70%;
  margin-top: 10px;
}

.other-message {
  align-self: flex-start;
  background-color: #e5e7eb;
  color: black;
  padding: 8px 12px;
  border-radius: 12px 12px 12px 0;
  max-width: 70%;
  margin-top: 10px;
}

.sender{
    font-size: 14px;
}

.messageDate{
    font-size: 13px;
}

.messageContent{
    font-size: 17px;
}

.messageInfo{
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>