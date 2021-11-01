import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Dashboard from "@/views/Dashboard.vue";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props:true 
  },
  { 
    name: 'dashboard',
    path: '/dashboard', 
    component: Dashboard, 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;