<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import JoinOrganisationView from "./JoinOrganisationView.vue";

const router = useRouter();

const users = ref([
  { id: 1, username: "Janik" },
  { id: 2, username: "Pascal" },
  { id: 3, username: "Benjamin" },
  { id: 4, username: "Julian" },
])


</script>

<template>
  <div class="page">
    <aside class="sidebar">
      <div class="nav-item active">
        <img class="icon" src="@/assets/settings.svg" />
        <span>Neue Organisation</span>
      </div>

      <div class="nav-item" @click="router.push('/join-org')">
        <img class="icon" src="@/assets/members.svg" />
        <span>Organisation beitreten</span>
      </div>
    </aside>

    <main class="content">
      <h2>Neue Organisation</h2>

      <div class="form-group">
        <label>Organisationsname</label>
        <input class="text-input" placeholder="Name der Organisation" />
      </div>


      <div class="form-group">

</div>

          
      <button>Speichern</button>
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

h2 {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 28px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}

.text-input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.channels-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  row-gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

.channel-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 20px;
  background: #f3f3f3;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
  font-size: 16px;
  white-space: nowrap;
}

.channel-input {
  flex: 1;
  min-width: 280px;
  width: auto;
  padding: 12px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
}

.plus-icon,
.remove-btn {
  width: 32px;
  height: 32px;
  cursor: pointer;
  flex: 0 0 auto;
}

button {
  margin-top: 36px;
  width: 100%;
  padding: 18px 0;
  border-radius: 28px;
  border: none;
  background: #5f5fa4;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  filter: brightness(0.9);
}
</style>
