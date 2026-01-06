<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchtext = ref('')

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
</script>

<template>
  <div class="top-bar">
    <div class="logo">
      <router-link to="/">
        <img src="@/assets/handshake.svg" alt="Logo" />
      </router-link>
    </div>

    <div class="form-group">
      <input v-model="searchtext" placeholder="Suchen" />
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

<style scoped lang="scss">
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  height: 70px;
  background-color: var(--background);
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
</style>
