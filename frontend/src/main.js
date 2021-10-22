import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp({})
app.config.globalProperties.$apiUrl = 'http://localhost:3000/groupomania';


createApp(App).use(router).mount('#app')
