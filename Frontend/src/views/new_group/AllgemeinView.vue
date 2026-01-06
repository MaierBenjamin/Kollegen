<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Liste der Kanäle 
const channels = ref<string[]>(["Allgemein"]);

// Neues Feld 
const newChannel = ref<string>("");

// Kanal hinzufügen
function addChannel() {
  const name = newChannel.value.trim();
  if (!name) return;

  if (channels.value.includes(name)) return;

  channels.value.push(name);
  newChannel.value = "";
}

// Kanal entfernen
function removeChannel(index: number) {
  if (channels.value[index] === "Allgemein") return;
  channels.value.splice(index, 1);
}

</script>

<template>
  <div class="page">
    <aside class="sidebar">
      <div class="nav-item active">
        <img class="icon" src="@/assets/settings.svg" alt="settings" />
        <span>Allgemein</span>
      </div>

      <div class="nav-item" @click="router.push('/mitglieder')">
        <img class="icon" src="@/assets/members.svg" alt="members" />
        <span>Mitglieder</span>
      </div>
    </aside>

    <main class="content">
      <h2>Allgemein</h2>

      <form class="mannschafts-name" @submit.prevent>
        <!-- Mannschaftsname -->
        <div class="form-group">
          <label for="name">Mannschaftsname</label>
          <input />
        </div>
        
        <!-- Kanäle -->
        <div class="form-group">
          <label>Kanäle</label>

          <!-- vorhandene Kanäle anzeigen -->
          <div class="channel-list">
            <div class="channel-row" v-for="(c, i) in channels" :key="i">
              <input :value="c" readonly />

              <img
                class="remove-btn"
                src="@/assets/x.svg"
                alt="Entfernen"
                @click="removeChannel(i)"
              > 
            </div>
          </div>

          <!-- neuen Kanal hinzufügen -->
          <div class="add-row">
            <input
              v-model="newChannel"
              placeholder="Neuer Kanalname (z.B. News)"
              @keydown.enter.prevent="addChannel"
            />

            <img
              class="plus-icon"
              src="@/assets/circle-plus.svg"
              alt="Plus"
              @click="addChannel"
            />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>


<style scoped>
.page {
  height: 100vh;
  display: flex;
  background-color: #e2e3ff;
}

.sidebar {
  width: 30%;
  background: #d9d9d9;
  border: 2px solid #000;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 28px;
  font-weight: 600;
  padding: 14px 16px;
  border-radius: 14px;
  cursor: pointer;
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.06);
}

.nav-item.active {
  background: rgba(0, 0, 0, 0.08);
}

.icon {
  width: 44px;
  height: 44px;
}

.content {
  flex: 1;
  padding: 40px;    
}

.form-group input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  margin-top: 20px;
  font-size: 16px;
}

.plus-icon {
  height: 32px;
  width: 32px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
}

.channel-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.channel-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-btn {
  height: 32px;
  width: 32px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
}

.add-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

</style>
