import { createRouter, createWebHistory } from 'vue-router';
import Expediente from '@/components/Expediente.vue';  // Alias @ asume que está configurado en vite.config.js
import Documento from '@/components/Documento.vue';

const routes = [
  {
    path: '/',
    redirect: '/expediente'  
  },
  {
    path: '/expediente',
    name: 'Expediente',
    component: Expediente
  },
  {
    path: '/documento',
    name: 'Documento',
    component: Documento
  }
];

const router = createRouter({
  history: createWebHistory(), 
  routes
});

export default router;
