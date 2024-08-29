import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'  // Importamos el router

// Creamos la app y le añadimos el router antes de montarla
createApp(App)
  .use(router)   // Usamos el router en la aplicación
  .mount('#app')
