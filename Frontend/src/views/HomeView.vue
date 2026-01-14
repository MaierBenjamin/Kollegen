<script setup>
import { getGroups } from '@/api/routes/groups';
import { onMounted, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { selectedOrganization } from '@/api/routes/organizations';

const groups = ref([])
const router = useRouter()
const groupsLoading = ref(true)
const orgAvailable = ref(false)

onMounted(async () => {
  const selectedOrganizationResponse = await selectedOrganization() 

  if (selectedOrganizationResponse.selectedOrganization) {
    const response = await getGroups(selectedOrganizationResponse.selectedOrganization)
    
    if (response.success) {
      groups.value = response.groups
      orgAvailable.value = true
    }
  }

  groupsLoading.value = false
})
</script>

<template>
  <div class="home-view">
    <img
      class="plus-icon"
      src="@/assets/circle-plus.svg"
      alt="Plus"
      @click="router.push('/new-group')"
      v-if="!groupsLoading && orgAvailable"
    />
    <div
      class="gruppen-card"
      v-for="group in groups"
      v-if="groups.length !== 0 && !groupsLoading && orgAvailable"
      :key="group.groupId"
      @click="router.push('/group-view')"
    >
      <h2>{{ group.name }}</h2>
    </div>
    <div v-else-if="groups.length === 0 && !groupsLoading && orgAvailable">Noch keine Gruppen</div>
    <div v-else-if="groups.length === 0 && !groupsLoading && !orgAvailable">Keine Organisation verfügbar. <RouterLink to="/new-org">Erstelle eine</RouterLink> oder <RouterLink to="/join-org">tritt einer bei</RouterLink> und dann wähle sie in den <RouterLink to="/account">Accounteinstellungen</RouterLink> aus</div>
  </div>
</template>

<style scoped>
.home-view {
  position: relative;   
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  background: transparent;
}

.plus-icon {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  cursor: pointer;
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

.gruppen-card:hover {
  filter: brightness(0.9);
}
</style>
