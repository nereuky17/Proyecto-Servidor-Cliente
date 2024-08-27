<template>
    <div>
      <!-- Formulario para crear expediente -->
      <div>
        <label for="expedienteNombre">Nombre del Expediente:</label>
        <input id="expedienteNombre" v-model="nuevoExpediente.nombre" :disabled="isExpedienteCreado" />
        <button @click="crearExpediente" :disabled="isExpedienteCreado">Crear Expediente</button>
      </div>
  
      <!-- Mostrar el ID del expediente creado y habilitar la creación de documentos -->
      <div v-if="isExpedienteCreado">
        <p>Expediente creado: {{ nuevoExpediente.nombre }} (ID: {{ expedienteId }})</p>
  
        <!-- Formulario para crear documento -->
        <label for="documentoNombre">Nombre del Documento:</label>
        <input id="documentoNombre" v-model="nuevoDocumento.nombre" />
        <label for="documentoContenido">Contenido del Documento:</label>
        <input id="documentoContenido" v-model="nuevoDocumento.contenido" />
        <button @click="añadirDocumentos">Añadir Documentos</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  // Variables reactivas
  const isExpedienteCreado = ref(false);
  const nuevoExpediente = ref({ nombre: '' });
  const expedienteId = ref(null);
  const nuevoDocumento = ref({ nombre: '', contenido: '' });
  
  // Función para crear un nuevo expediente
  const crearExpediente = () => {
    axios.post('http://localhost:8082/expediente/crear', { nombre: nuevoExpediente.value.nombre })
      .then(response => {
        expedienteId.value = response.data.id; // Captura el ID del expediente creado
        isExpedienteCreado.value = true; // Habilita la creación de documentos
      })
      .catch(error => {
        console.error('Error al crear expediente:', error);
      });
  };
  
  // Función para añadir documentos al expediente
  const añadirDocumentos = () => {
    const documento = {
      titulo: nuevoDocumento.value.nombre,
      contenido: nuevoDocumento.value.contenido,
      expediente: { id: expedienteId.value } // Asigna el ID del expediente al documento
    };
  
    axios.post('http://localhost:8082/documento/crear', documento)
      .then(response => {
        console.log('Documento añadido correctamente:', response.data);
        // Limpia el formulario de documento tras la creación
        nuevoDocumento.value = { nombre: '', contenido: '' };
      })
      .catch(error => {
        console.error('Error al añadir documento:', error);
      });
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados */
  </style>
  