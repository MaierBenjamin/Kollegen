<template>
  <div class="account-page">
    <!-- Icon oben -->
    <div class="icon-wrapper">
      <img src="@/assets/handshake.svg" alt="Handshake" />
    </div>

    <!-- Karte -->
    <div class="login-card">
      <h1 class="login-title">Login</h1>

      <form class="login-form" @submit.prevent="handleLogin">
        <!-- E-Mail -->
        <div class="form-group">
          <label for="email">E-Mail oder Benutzername</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="example@.com"
            required
          />
        </div>

        <!-- Passwort -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="example@.com"
            required
          />
        </div>

        <!-- Button -->
        <button type="submit" class="login-button">
          Login
        </button>
      </form>

      <!-- Text unten -->
      <p class="register-text">
        Haben Sie bereits ein Konto?
        <RouterLink to="/register">Jetzt kostenlos registrieren.</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const handleLogin = async () => {

  console.log("Login with:", email.value, password.value);
};
</script>

<style scoped>
/* Icon oben */
.icon-wrapper {
  font-size: 72px;
  margin-bottom: 20px;
}

/* Karte */
.login-card {
  background: #e7e7ff;
  border-radius: 20px;
  width: min(800px, 90%);
  padding: 60px 80px 40px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
}

.account-page {
  min-height: 100vh;
  background-color: #6264a7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 70px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* Titel */
.login-title {
  text-align: center;
  font-size: 48px;
  margin-bottom: 50px;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
}

.form-group input {
  width: 100%;
  padding: 14px 18px;
  border-radius: 20px;
  border: none;
  background: #f3f3f3;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}

/* Button */
.login-button {
  margin-top: 32px;
  width: 100%;
  padding: 16px 0;
  border-radius: 24px;
  border: none;
  background: #5f5fa4;
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.35);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 20px rgba(0, 0, 0, 0.4);
}

/* Text unten */
.register-text {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
}

.register-text a {
  color: #42426d;
  text-decoration: none;
  font-weight: 500;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
