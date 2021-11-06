import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Profile from "@/views/Profile.vue";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },  
  { 
    name: 'dashboard',
    path: '/dashboard', 
    component: Dashboard, 
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;