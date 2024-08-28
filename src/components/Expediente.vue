<template>
  <div>
    <h1>Expedientes</h1>

    <!-- Combo para seleccionar expediente -->
    <select v-model="selectedExpediente" @change="onExpedienteChange">
      <option v-for="expediente in expedientes" :key="expediente.id" :value="expediente">
        {{ expediente.nombre }}
      </option>
    </select>

    <!-- Contenedor para el combo de documento y los botones -->
    <div v-if="selectedExpediente" class="document-container">
      <!-- Combo para seleccionar documento -->
      <select v-model="selectedDocumento">
        <option v-for="documento in selectedExpediente.documentos" :key="documento.id" :value="documento">
          {{ documento.titulo }}
        </option>
      </select>

      <!-- Mostrar botones de acción si hay un documento seleccionado -->
      <div v-if="selectedDocumento" class="action-buttons">
        <button @click="editDocumento(selectedDocumento.id)">Editar</button>
        <button @click="deleteDocumento(selectedDocumento.id)">Eliminar</button>
        <button @click="showDetails(selectedDocumento)">Ver Detalle</button>
      </div>
    </div>

    <!-- Modal para mostrar detalles del documento -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Detalles del Documento</h2>
        <p><strong>Título:</strong> {{ selectedDocumento.titulo }}</p>
        <p><strong>Contenido:</strong> {{ selectedDocumento.contenido }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const expedientes = ref([]);
    const selectedExpediente = ref(null);
    const selectedDocumento = ref(null);
    const showModal = ref(false);
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

    const onExpedienteChange = () => {
      selectedDocumento.value = null;
    };

    const editDocumento = (id) => {
      router.push(`/documento/${id}`);
    };

    const deleteDocumento = (id) => {
      axios.delete(`/documento/${id}`, { withCredentials: true })
        .then(() => {
          fetchExpedientes(); // Refresca la lista de expedientes después de eliminar
          selectedDocumento.value = null; // Resetea el documento seleccionado
         
        })
        .catch(error => {
          console.error('Error al eliminar documento:', error);
        });
    };

    const showDetails = (documento) => {
      selectedDocumento.value = documento;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    fetchExpedientes();

    return {
      expedientes,
      selectedExpediente,
      selectedDocumento,
      showModal,
      onExpedienteChange,
      editDocumento,
      deleteDocumento,
      showDetails,
      closeModal
    };
  }
};
</script>

<style>

.document-container {
  margin-top: 20px;
}

.action-buttons {
  margin-top: 10px;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>