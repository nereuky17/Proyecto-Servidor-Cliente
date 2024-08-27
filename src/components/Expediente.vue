<template>
    <div>
      <h1>Expedientes</h1>
      <ul>
        <!-- Lista de Expedientes con opción de ver documentos -->
        <li v-for="expediente in expedientes" :key="expediente.id">
          {{ expediente.nombre }}
          <button @click="viewDocumentos(expediente)">Ver Documentos</button>
        </li>
      </ul>
      
      <!-- Documentos asociados al expediente seleccionado -->
      <div v-if="selectedExpediente">
        <h2>Documentos de {{ selectedExpediente.nombre }}</h2>
        <ul v-if="selectedExpediente.documentos.length > 0">
          <li v-for="documento in selectedExpediente.documentos" :key="documento.id">
            <p><strong>Nombre:</strong> {{ documento.nombre }}</p>
            <p><strong>Contenido:</strong> {{ documento.contenido }}</p>
            <!-- Botón para editar y eliminar -->
            <button @click="editDocumento(documento)">Editar</button>
            <button @click="deleteDocumento(documento)">Eliminar</button>
          </li>
        </ul>
        <p v-else>No hay documentos asociados a este expediente.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // Variables reactivas
  const expedientes = ref([]);
  const selectedExpediente = ref(null);
  const router = useRouter();
  
  // Función para cargar todos los expedientes con sus documentos desde el servidor
  const fetchExpedientes = () => {
    axios.get('http://localhost:8082/expediente/listar')
      .then(response => {
        expedientes.value = response.data; // Asume que el backend devuelve expedientes con sus documentos
      })
      .catch(error => {
        console.error('Error al obtener expedientes:', error);
      });
  };
  
  // Función para ver los documentos asociados a un expediente
  const viewDocumentos = (expediente) => {
    // Cargar los documentos del expediente seleccionado
    axios.get(`http://localhost:8082/expediente/${expediente.id}/documentos`)
      .then(response => {
        // Asigna los documentos obtenidos al expediente seleccionado
        selectedExpediente.value = {
          ...expediente,
          documentos: response.data // Asegúrate de que la API devuelva un array de documentos
        };
      })
      .catch(error => {
        console.error('Error al obtener documentos del expediente:', error);
      });
  };
  
  // Función para eliminar un documento
  const deleteDocumento = (documento) => {
    axios.delete(`http://localhost:8082/documento/${documento.id}`)
      .then(() => {
        // Elimina el documento de la lista local
        selectedExpediente.value.documentos = selectedExpediente.value.documentos.filter(d => d.id !== documento.id);
      })
      .catch(error => {
        console.error('Error al eliminar documento:', error);
      });
  };
  
  // Función para redirigir a la página de edición del documento
  const editDocumento = (documento) => {
    router.push({ name: 'EditarDocumento', params: { id: documento.id } });
  };
  
  // Cargar expedientes al montar el componente
  fetchExpedientes();
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  