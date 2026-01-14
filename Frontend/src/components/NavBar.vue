<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchtext = ref("")
const isSearchActive = ref(false)
const searchWrapper = ref(null) 

function startChat(user) {
  console.log("Starte Chat mit:", user)
  isSearchActive.value = false
  searchtext.value = ""
}

const users = ref([
  { id: 1, username: "Janik" },
  { id: 2, username: "Pascal" },
  { id: 3, username: "Benjamin" },
  { id: 4, username: "Julian" },
])

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.username.toLowerCase().includes(searchtext.value.toLowerCase())
  )
})

const username = ref("Pascal")
const firstLetter = computed(() => {
  return username.value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
})

const colors = ['#f87171','#34d399','#60a5fa','#fbbf24','#a78bfa','#f472b6']
const pfpColor = ref(colors[Math.floor(Math.random() * colors.length)])

function onPFPClick() {
  router.push('/account')
}

function handleClickOutside(event) {
  if (searchWrapper.value && !searchWrapper.value.contains(event.target)) {
    isSearchActive.value = false
  }
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    isSearchActive.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>


<template>
  <div class="top-bar">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/handshake.svg" alt="Logo" />
      </router-link>
    </div>

    <div class="search-wrapper">
      <input
        v-model="searchtext"
        placeholder="Neuer Chat"
        class="search-input"
        @focus="isSearchActive = true"
      />

      <div v-if="isSearchActive" class="user-list-wrapper">
        <div
          v-for="user in filteredUsers"
          :key="user.id"
          class="user-item"
          @click="startChat(user)"
        >
          {{ user.username }}
        </div>
      </div>
    </div>

    <div class="profilpicture"
         :style="{ backgroundColor: pfpColor }"
         @click="onPFPClick">
      {{ firstLetter }}
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: #6264a7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-sizing: border-box;
}

.top-bar .logo img {
  width: 50px;
  height: 50px;
}

.search-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.search-input {
  width: 50%;
  max-width: 400px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
  
}

.user-list-wrapper {
  position: absolute;
  top: 45px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  z-index: 1001;
  cursor: pointer;
}

.profilpicture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}


</style>
