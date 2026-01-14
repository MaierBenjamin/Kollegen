<script setup>
import { getOrganization, getOrganizations } from '@/api/routes/organizations'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const organizations = ref([])
const info = ref({})
const router = useRouter()


const activeTab = ref('chooseOrg')

async function switchToInfo(orgId) {
  const response = await getOrganization(orgId)

  if (response.success) {
    info.value = response.organization
    activeTab.value = "info"
  }
}

onMounted(async () => {
  const orgsResponse = await getOrganizations()

  if (orgsResponse.success) {
    organizations.value = orgsResponse.organizations
  }
})
</script>

<template>
  <div class="page">
    <aside class="sidebar">
      <div class="nav-item" @click="router.push('/new-org')">
        <img class="icon" src="@/assets/settings.svg" />
        <span>Neue Organisation</span>
      </div>

      <div class="nav-item" @click="router.push('/join-org')">
        <img class="icon" src="@/assets/members.svg" />
        <span>Organisation beitreten</span>
      </div>

      <div class="nav-item active">
        <img class="icon" src="@/assets/members.svg" />
        <span>Organisationen verwalten</span>
      </div>
    </aside>

    <main class="content">
      <h2>Organisationen verwalten</h2>

      <div v-if="activeTab === 'chooseOrg'">
        <div
          class="gruppen-card"
          v-for="org in organizations"
          :key="org.organizationId"
          @click="switchToInfo(org.organizationId)"
        >
          <h2>{{ org.name }}</h2>
        </div>
      </div>

      <div v-if="activeTab === 'info'">
        <div>{{ `Description: ${info.description}` }}</div>
        <div>{{ `Join ID: ${info.joinUUID}` }}</div>
      </div>

      <div class="form-group"></div>

    </main>
  </div>
</template>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  background-color: #e2e3ff;
}

.gruppen-card {
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

.form-group {
  margin-bottom: 28px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}

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
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
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
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
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
  margin-top: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
}

.roles-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  row-gap: 12px;
  flex-wrap: wrap;
  width: 100%;
}

.role-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 20px;
  background: #f3f3f3;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  white-space: nowrap;
}

.role-input {
  flex: 1; /* nimmt restlichen Platz */
  min-width: 280px; /* verhindert mini-input */
  width: auto; /* wichtig: nicht 100% */
  padding: 12px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.plus-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
  flex: 0 0 auto;
}

.remove-btn {
  width: 28px;
  height: 28px;
  cursor: pointer;
  opacity: 0.8;
  flex: 0 0 auto;
}

.remove-btn:hover {
  opacity: 1;
}
</style>
