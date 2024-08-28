<template>
    <div>
      <h1>Expedientes</h1>
      
      <!-- Tabla para mostrar expedientes y documentos -->
      <table>
        <thead>
          <tr>
            <th>Nombre del Expediente</th>
            <th>Documento</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iterar sobre cada expediente -->
          <tr v-for="expediente in expedientes" :key="expediente.id">
            <!-- Mostrar el nombre del expediente -->
            <td>{{ expediente.nombre }}</td>
            
            <!-- Mostrar documentos dentro del expediente -->
            <td v-if="expediente.documentos && expediente.documentos.length > 0">
              <table>
                <tbody>
                  <tr v-for="documento in expediente.documentos" :key="documento.id">
                    <td>{{ documento.titulo }}</td>
                    <td>{{ documento.contenido }}</td>
                    <td>
                      <button @click="editDocumento(documento.id)">Editar</button>
                      <button @click="deleteDocumento(documento.id)">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <!-- Añadir una línea divisoria entre cada expediente -->
          <tr v-for="expediente in expedientes" :key="'divider-' + expediente.id">
          <td colspan="2"><hr /></td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const expedientes = ref([]);
      const router = useRouter();
  
      const fetchExpedientes = () => {
        axios.get('/expediente/listar', { withCredentials: true })
          .then(response => {
            expedientes.value = response.data;
          })
          .catch(error => {
            console.error('Error al obtener expedientes:', error);
          });
      };
  
      const editDocumento = (id) => {
        router.push(`/documento/${id}`);
      };
  
      const deleteDocumento = (id) => {
        axios.delete(`/documento/${id}`, { withCredentials: true })
          .then(() => {
            fetchExpedientes(); // Refresca la lista de expedientes después de eliminar
          })
          .catch(error => {
            console.error('Error al eliminar documento:', error);
          });
      };
  
      fetchExpedientes();
  
      return {
        expedientes,
        editDocumento,
        deleteDocumento
      };
    }
  };
  </script>
  