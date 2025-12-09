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
<div class="page-wrapper">
  <div class="account-content">
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
    <div class="profilpicture-content">
        <div class="profilpicture">
            <img src="@/assets/sigma.webp" alt="">
        </div>

        <button @click="openFileDialog">Profilbild ändern</button>
    </div>
    
    <input type="file" ref="fileInput" style="display: none;" />

    <button>Änderungen speichern</button>
</div>
</div>
</template>

<style lang="scss" scoped>

.account-content {

  display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
  width: 400px; 
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin: 0 auto;
}

.page-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.h1{
    font-family:Arial, Helvetica, sans-serif;
    text-align: center;
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

.profilpicture-content
{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>
