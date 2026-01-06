<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Liste der Rollen
const roles = ref<string[]>(["@member"]);

// Neues Feld
const newRole = ref<string>("");

// Rolle hinzufügen
function addRole() {
  const name = newRole.value.trim();
  if (!name) return;

  if (roles.value.includes(name)) return;

  roles.value.push(name);
  newRole.value = "";
}

// Rolle entfernen
function removeRole(index: number) {
  if (roles.value[index] === "@member") return;
  roles.value.splice(index, 1);
}
</script>

<template>
  <div class="page">
    <aside class="sidebar">
      <div class="nav-item" @click="router.push('/new-group')">
        <img class="icon" src="@/assets/settings.svg" alt="settings" />
        <span>Allgemein</span>
      </div>

      <div class="nav-item active">
        <img class="icon" src="@/assets/members.svg" alt="members" />
        <span>Rollen</span>
      </div>
    </aside>

    <main class="content">
      <h2>Rollen</h2>

      <form class="rollen-form" @submit.prevent>
        <div class="form-group">
          <label>Rollen</label>

          <div class="role-list">
            <div class="role-row" v-for="(c, i) in roles" :key="c">
              <input :value="c" readonly />

              <img
                class="remove-btn"
                src="@/assets/x.svg"
                alt="Entfernen"
                @click="removeRole(i)"
              />
            </div>
          </div>

          <div class="add-role">
            <input
              v-model="newRole"
              placeholder="Neuer Rollenname (z.B. Admin)"
              @keydown.enter.prevent="addRole"
            />

            <img
              class="plus-icon"
              src="@/assets/circle-plus.svg"
              alt="Plus"
              @click="addRole"
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

.role-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}

.role-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-role {
  display: flex;
  align-items: center;
  gap: 12px;
}

.plus-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.remove-btn {
  width: 28px;
  height: 28px;
  cursor: pointer;
  opacity: 0.8;
}

.remove-btn:hover {
  opacity: 1;
}


</style>
