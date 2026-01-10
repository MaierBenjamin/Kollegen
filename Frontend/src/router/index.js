import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import AccountView from '@/views/AccountView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import AllgemeinView from '@/views/new_group/AllgemeinView.vue'
import NewRollenView from '@/views/new_group/NewRollenView.vue'

import GroupView from '@/views/GroupView.vue'
import DirectMessageView from '@/views/DirectMessageView.vue'

import AllGroupsView from '@/views/AllGroupsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      children: [
        { path: "", name: "home", component: HomeView },
        { path: "account", name: "account", component: AccountView },
        { path: "new-group", name: "new-group", component: AllgemeinView },
        { path: "neu_rollen", name: "neu_rollen", component: NewRollenView },
        { path: "group-view", name: "group-view", component: GroupView },
        { path: "direct-message", name: "direct-message", component: DirectMessageView },
        { path: "all-groups", name: "all-groups", component: AllGroupsView },

      ],
    },
    {
      path: "/",
      component: AuthLayout,
      children: [
        { path: "login", name: "login", component: LoginView },
        { path: "register", name: "register", component: RegisterView },
      ],
    },
  ],
})
export default router