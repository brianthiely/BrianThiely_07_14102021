import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp.prototype.$apiUrl = 'http://localhost:3000/groupomania';

createApp(App).use(router).mount('#app')
