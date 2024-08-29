import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue'; 
import Expediente from '@/components/Expediente.vue';  
import Documento from '@/components/Documento.vue';
import EditarDocumento from '@/components/EditDocument.vue'; 
import BusquedaExpediente from '@/components/BusquedaExpediente.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  },
  {
    path: '/documento/:id?',
    name: 'Documento',
    component: Documento
  },
  {
    path: '/documento/editar/:id', // Ruta para editar documento
    name: 'EditarDocumento',
    component: EditarDocumento
  },
  {
    path: '/expedientebus', // Ruta para editar documento
    name: 'BusquedaExpediente',
    component: BusquedaExpediente
  }
];

const router = createRouter({
  history: createWebHashHistory(), 
  routes
});

export default router;