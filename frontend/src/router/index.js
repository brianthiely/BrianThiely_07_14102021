import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";


const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
 
  { 
    name: 'dashboard',
    path: '/dashboard', 
    component:  Dashboard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;