<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout, editUserdata, getUserdata } from '@/api/routes/users'
import { getOrganizations, selectedOrganization, setSelectedOrganization } from '@/api/routes/organizations'

const router = useRouter()
const username = ref("")
const email = ref("")

const organizations = ref([])

const selected = ref("")
const isOpen = ref(false)

async function saveChanges() {
  const response = await editUserdata(username.value, email.value)

  if (response.success) router.push("/")
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

async function selectOption(org) {
  selected.value = org.name
  isOpen.value = false

  await setSelectedOrganization(org.organizationId)
}

async function handleLogout() {
  const response = await logout()
  if (response.success) router.push("/login")
}

onMounted(async () => {
  const userResponse = await getUserdata()

  if (userResponse.success) {
    username.value = userResponse.user.username
    email.value = userResponse.user.email
  }

  const organizationsResponse = await getOrganizations()

  if (organizationsResponse.success) {
    organizations.value = organizationsResponse.organizations
  }

  const selectedOrganizationResponse = await selectedOrganization() 

  if (selectedOrganizationResponse.success && selectedOrganizationResponse.selectedOrganization) {
    selected.value = organizations.value.find(org => org.organizationId === selectedOrganizationResponse.selectedOrganization).name
  } else {
    selected.value = "--- Select an organization ---"
  }
})
</script>

<template>
  <div class="page-wrapper">
    <div class="account-content">
      <h2 class="h1">Konto Übersicht</h2> 

      <h3>Benutzername</h3>
      <div class="input-field">
        <input id="username" v-model="username" placeholder="Benutzername" />
      </div>

      <h3>E-Mail</h3>
      <div class="input-field">
        <input id="email" v-model="email" placeholder="E-Mail" />
      </div>

      <h3>Aktuelle Organisation</h3>
      <div class="organisations">
        <div class="dropdown">
          <button class="dropdown-btn" @click="toggleDropdown">
            {{ selected }} 
          </button>
          <ul v-show="isOpen" class="dropdown-list">
            <div 
              v-for="org in organizations" 
              :key="index" 
              @click="selectOption(org)"
            >
              {{ org.name }}
          </div>
          </ul>
        </div>
        <img
        class="plus-icon"
        src="@/assets/circle-plus.svg"
        alt="Plus"
        @click="$router.push('/new-org')"
        />
        </div>
      <button class="button" @click="saveChanges">Änderungen speichern</button>
      <button class="button logout-button" @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<style scoped>
.account-content {
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.input-field label { display: block; margin-bottom: 8px; font-size: 16px; } .input-field input { width: 100%; padding: 14px 18px; border-radius: 20px; border: none; background: #f3f3f3; font-size: 16px; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15); }

.organisations {
  display: flex;
  align-items: center;
  gap: 12px; 
  margin-bottom: 20px;
}

.dropdown-btn {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 10px 16px;
  background: #f3f3f3;
  cursor: pointer;
}

.dropdown-list {
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  list-style: none;
  padding: 8px 0;
}

.dropdown-list div {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-list div:hover {
  background: #e5e5e5;
}

.plus-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}


.button { 
  margin-top: 20px; 
  color: white; 
  background-color: var(--background); 
  border: none; 
  border-radius: 12px; 
  padding: 8px 16px; 
  cursor: pointer; 
  height: 40px; 
  transition: all 0.3s ease; 
}

.button:hover { 
  filter: brightness(0.9); 
}

.logout-button {
  background-color: transparent;
  border: 2px solid var(--background);
  color: var(--background);
}
</style>
