<script setup>

</script>
<template>
    <div class="left-bar">
        <router-link to="/" class="logo">
            <img src="@/assets/group.svg" alt="">
        </router-link>
        <router-link to="/direct-message" class="logo">
            <img src="@/assets/chat.svg" alt="">
        </router-link>
        
    </div>
</template>
<style scoped>
.router-wrapper {
  width: 100%;
  display: block;
}


.left-bar {
  width: 90px;
  background-color: #6264a7;
  border-right: 1px solid white;
  padding-top: 20px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
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
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
}

.form-group input {
  width: 50%;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

.profilpicture img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.profilpicture {
  background: none;
  border: none;
  cursor: pointer;
}
</style>