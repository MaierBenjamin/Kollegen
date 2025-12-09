<script setup>
import NavBar from '@/components/NavBar.vue';
const firstName = "Pascal";
const lastName = "Bühler";

const names = firstName + " " + lastName;
const email = "pascal_buehler@sluz.ch";
const password = "Pascal123";


import { ref } from 'vue'

const fileInput = ref(null)

function openFileDialog() {
  fileInput.value.click()
}
</script>


<template>
<h1 class="h1">Konto Übersicht</h1>
<h2>Vor- und Nachname</h2>
<div class="form-group">
            <input
            id="search"
            v-model="names"
            placeholder="Search"
          />
</div>
<h2>E-Mail</h2>
<div class="form-group">
            <input
            id="search"
            v-model="email"
            placeholder="Search"
          />
</div>
<h2>Passwort</h2>
<div class="form-group">
            <input
            id="search"
            v-model="password"
            placeholder="Passwort"
          />
</div>
<div class="logo">
            <router-link to="/" class="profilpicture">
            <img src="@/assets/sigma.webp" alt="">
            </router-link>
            
        </div>


<button @click="openFileDialog">Profilbild ändern</button>
<input type="file" ref="fileInput" style="display: none;" />

<button>Änderungen speichern</button>

</template>

<style lang="scss" scoped>
.h1{
    font-family:Arial, Helvetica, sans-serif;
    padding-left: 100%;
}

.profilpicture img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.profilpicture  {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
