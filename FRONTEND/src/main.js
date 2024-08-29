import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'  // Importamos el router
import 'bootstrap/dist/css/bootstrap.min.css' // Importa el CSS de Bootstrap

// Importa el JS de Bootstrap (esto incluye Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Creamos la app y le añadimos el router antes de montarla
createApp(App)
  .use(router)   // Usamos el router en la aplicación
  .mount('#app')
