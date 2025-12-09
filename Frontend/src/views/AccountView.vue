<script setup>
import NavBar from '@/components/NavBar.vue';

const username = "Pascal123";
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
    <h2>Benutzername</h2>
    <div class="input-field">
                <input
                id="username"
                v-model="username"
                placeholder="Benutzername"
            />
    </div>
    <h2>E-Mail</h2>
    <div class="input-field">
                <input
                id="email"
                v-model="email"
                placeholder="E-Mail"
            />
    </div>
    <h2>Passwort</h2>
    <div class="input-field">
                <input
                id="password"
                v-model="password"
                placeholder="Passwort"
            />
    </div>

    

    <button class="button">Änderungen speichern</button>
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
}

.profilpicture-content
{
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 30px;
    align-items: center;
}

.input-field{
        flex: 1;                      
    display: flex;
    justify-content: center; 

    label {
        display: block;
        margin-bottom: 8px;
        font-size: 16px;
    }
 
    input {
        width: 100%;
        padding: 14px 18px;
        border-radius: 20px;
        border: none;
        background: #f3f3f3;
        font-size: 16px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }


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
}
</style>
