<template>
    <div>
      <h2>Editar Documento</h2>
      <label for="documentoNombre">Nombre del Documento:</label>
      <input id="documentoNombre" v-model="documento.titulo" />
  
      <label for="documentoContenido">Contenido del Documento:</label>
      <input id="documentoContenido" v-model="documento.contenido" />
  
      <button @click="actualizarDocumento">Guardar Cambios</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const documento = ref({});
      const route = useRoute();
      const router = useRouter();
  
      const fetchDocumento = () => {
        if (documentoId) {
        axios.get(`/expediente/${expedienteId}/documento/${documentoId}`)
          .then(response => {
            documento.value = response.data;
          })
          .catch(error => {
            console.error('Error al obtener documento:', error);
          });
      }
    };
  
      const actualizarDocumento = () => {
        if (documentoId) {
        // Actualizar documento existente
        axios.put(`/expediente/${expedienteId}/documento/${documentoId}`, documento.value)
          .then(() => {
            router.push('/expedientes');
          })
          .catch(error => {
            console.error('Error al actualizar documento:', error);
          });
      } else {
        // Crear nuevo documento
        console.log('Creating new documento in expedienteId:', expedienteId);
        axios.post(`http://localhost:8082/expediente/${expedienteId}/documento`, documento.value)
          .then(response => {
            console.log('Documento created:', response.data);
            router.push('/expedientes');
          })
          .catch(error => {
            console.error('Error al crear documento:', error);
          });
      }
    };
      onMounted(fetchDocumento);
  
      return {
        documento,
        actualizarDocumento
      };
    }
  };
  </script>