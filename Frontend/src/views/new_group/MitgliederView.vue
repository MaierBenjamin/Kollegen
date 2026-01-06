<template>
  <div class="page">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="nav-item" @click="$router.push('/new-group')">
        <img class="icon" src="@/assets/settings.svg" alt="settings" />
        <span>Allgemein</span>
      </div>

      <div class="nav-item active">
        <img class="icon" src="@/assets/members.svg" alt="members" />
        <span>Mitglieder</span>
      </div>
    </aside>

    <!-- Content -->
    <main class="content">
      <h2>Mitglieder</h2>
    </main>
  </div>
</template>


<style scoped>
.page {
  height: 100vh;
  display: flex;
  background-color: #e2e3ff;
}

/* Sidebar links */
.sidebar {
  width: 30%;
  background: #d9d9d9;
  border: 2px solid #000;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Ein Menüpunkt (Icon + Text) */
.nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 28px;
  font-weight: 600;
  padding: 14px 16px;
  border-radius: 14px;
  cursor: pointer;
}

.nav-item:hover {
  background: rgba(0, 0, 0, 0.06);
}

/* Aktiver Punkt (wie markiert in Bild 2) */
.nav-item.active {
  background: rgba(0, 0, 0, 0.08);
}

/* Icon-Größe */
.icon {
  width: 44px;
  height: 44px;
}

/* Content rechts */
.content {
  flex: 1;
  padding: 40px;    
}
</style>
