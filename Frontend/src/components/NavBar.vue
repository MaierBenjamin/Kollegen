<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchtext = ref("")
const isSearchActive = ref(false)
const searchWrapper = ref(null) // 👈 hier der Wrapper Ref

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


<div class="search-wrapper" ref="searchWrapper">
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

    <div
      class="profilpicture"
    :style="{ backgroundColor: pfpColor, fontFamily: 'Arial, Helvetica, sans-serif' }"
      @click="onPFPClick"
    >
      {{ firstLetter }}
    </div>
  </div>
</template>

<style scoped>
.router-wrapper {
  width: 100%;
  display: block;
}
 
body, html, #app {
  margin: 0;
  padding: 0;
  background-color: var(--background);
  font: inherit;
  height: 100%;
  width: 100%;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  height: 70px;
  background-color: #6264a7;
  border-bottom: 1px solid white;
  box-sizing: border-box;
}

.logo img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.form-group {
  flex: 1;
  display: flex;
  justify-content: center;

  input {
    width: 50%;
    padding: 14px 18px;
    border-radius: 20px;
    border: none;
    background: #f3f3f3;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
  }
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
  font-size: 18px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
}


.search-wrapper {
  position: relative;
  width: 50%;
}

.user-list-wrapper {
  position: absolute;
  top: 55px;
  left: 0;
  width: 100%;
  background: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  z-index: 1000;
}



.search-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  outline: none;
}

.user-item {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.user-item:hover {
  background: #e5e7eb;
}
.top-bar {
  position: relative;
}

.fake-search {
  width: 50%;
  padding: 14px 18px;
  border-radius: 20px;
  background: #f3f3f3;
  font-size: 16px;
  color: #888;
  cursor: text;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

</style>
